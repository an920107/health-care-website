import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/blob/attachment_response.dart';
import 'package:health_care_website/model/blob/image_response.dart';
import 'package:health_care_website/model/static_page/static_page.dart';
import 'package:health_care_website/util/http_util.dart';

abstract class StaticPageRepo {
  static Future<StaticPage?> getPage(PageTopic topic) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/static_post/${topic.id}",
      );
      response.check();
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on HttpRequestException catch (e) {
      if (e.statusCode == 404) return await createPage(topic);
      rethrow;
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<StaticPage?> createPage(PageTopic topic) async {
    final nameEntries = {"static_post_name": topic.id};
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.post,
        uri: "/api/static_post",
        authRequired: true,
        body: StaticPage(
          id: "",
          content: json.encode([
            {"insert": "\n"}
          ]),
          attachments: json.encode([]),
          viewer: 0,
          createTime: DateTime.now(),
          updateTime: DateTime.now(),
        ).toJson()
          ..addEntries(nameEntries.entries),
      );
      response.check();
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<StaticPage?> updatePage(
    PageTopic topic,
    StaticPage page,
  ) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.put,
        uri: "/api/static_post/${topic.id}",
        authRequired: true,
        body: page.toJson(),
      );
      response.check();
      return StaticPage.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<AttachmentResponse?> uploadAttachment(
    PageTopic topic,
    Uint8List blob,
    String filename,
  ) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/static_post/${topic.id}/attachment",
        field: "blob_attachment",
        filename: filename,
        blob: blob,
        authRequired: true,
      );
      response.check();
      return AttachmentResponse.fromJson(
          json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<ImageResponse?> uploadImage(
    PageTopic topic,
    Uint8List blob,
    String filename,
  ) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/static_post/${topic.id}/image",
        field: "blob_attachment",
        filename: filename,
        blob: blob,
        authRequired: true,
      );
      response.check();
      return ImageResponse.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<AttachmentInfo?> getAttachmentInfo(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/attachment/static_post/$id/info",
      );
      response.check();
      return AttachmentInfo.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<void> deleteAttachment(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/attachment/static_post/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
