import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/blob/attachment_response.dart';
import 'package:health_care_website/model/blob/image_response.dart';
import 'package:health_care_website/model/static_page/static_page.dart';
import 'package:http/http.dart' as http;

abstract class StaticPageRepo {
  static Future<StaticPage?> getPage(PageTopic topic) async {
    final url = Uri.https(Config.backend, "/api/static_post/${topic.id}");
    try {
      final response = await http.get(url);
      if (response.statusCode == 404) {
        return await createPage(topic);
      }
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<StaticPage?> createPage(PageTopic topic) async {
    final newPage = StaticPage(
      id: "",
      content: json.encode([
        {"insert": "\n"}
      ]),
      attachments: json.encode([]),
      viewer: 0,
      createTime: DateTime.now(),
      updateTime: DateTime.now(),
    );
    final url = Uri.https(Config.backend, "/api/static_post");
    final nameEntries = {"static_post_name": topic.id};
    try {
      final response = await http.post(url,
          body: newPage.toJson()..addEntries(nameEntries.entries));
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<StaticPage?> updatePage(
      PageTopic topic, StaticPage page) async {
    final url = Uri.https(Config.backend, "/api/static_post/${topic.id}");
    try {
      final response = await http.put(url, body: page.toJson());
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<AttachmentResponse?> uploadAttachment(
      PageTopic topic, Uint8List file, String filename) async {
    final url =
        Uri.https(Config.backend, "/api/static_post/${topic.id}/attachment");
    try {
      final request = http.MultipartRequest("POST", url);
      request.files.add(http.MultipartFile.fromBytes(
        "blob_attachment",
        file,
        filename: filename,
      ));
      final streamResponse = await request.send();
      final response = (await http.Response.fromStream(streamResponse));
      return AttachmentResponse.fromJson(
          json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<ImageResponse?> uploadImage(
      PageTopic topic, Uint8List file, String filename) async {
    final url = Uri.https(Config.backend, "/api/static_post/${topic.id}/image");
    try {
      final request = http.MultipartRequest("POST", url);
      request.files.add(http.MultipartFile.fromBytes(
        "blob_attachment",
        file,
        filename: filename,
      ));
      final streamResponse = await request.send();
      final response = (await http.Response.fromStream(streamResponse));
      return ImageResponse.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<AttachmentInfo?> getAttachmentInfo(String id) async {
    final url =
        Uri.https(Config.backend, "/api/attachment/static_post/$id/info");
    try {
      final response = await http.get(url);
      return AttachmentInfo.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<void> deleteAttachment(String id) async {
    final url = Uri.https(Config.backend, "/api/attachment/static_post/$id");
    try {
      await http.delete(url);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
