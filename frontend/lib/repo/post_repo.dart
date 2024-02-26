import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/model/post/attachment_info.dart';
import 'package:health_care_website/model/post/attachment_response.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/model/post/post_response.dart';
import 'package:http/http.dart' as http;

abstract class PostRepo {
  static Future<Post?> getPost(String id) async {
    final url = Uri.http(Config.backend, "api/posts/get_post", {"id": id});
    try {
      final response = await http.get(url);
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<PostResponse?> getPosts({PostColumn? column, int? page}) async {
    final url = Uri.http(Config.backend, "api/posts/get_post", {
      if (column != null) "column": column,
      if (page != null) "page": page,
    });
    try {
      final response = await http.get(url);
      return PostResponse.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<Post?> createPost() async {
    final url = Uri.http(Config.backend, "api/posts/upload_post");
    try {
      final response = await http.post(url,
          body: Post(
            id: "",
            title: "New Post",
            column: PostColumn.activity,
            content: json.encode([
              {"insert": "\n"}
            ]),
            attachments: json.encode([]),
            visible: false,
            createTime: DateTime.now(),
            updateTime: DateTime.now(),
          ).toJson());
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<Post?> updatePost(Post post) async {
    final url = Uri.http(Config.backend, "api/posts/update_post");
    try {
      final response = await http.put(url, body: post.toJson());
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<AttachmentResponse?> uploadAttachment(
      Uint8List file, String filename) async {
    final url = Uri.http(Config.backend, "api/posts/upload_attachment");
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

  static Future<AttachmentInfo?> getAttachmentInfo(String id) async {
    final url = Uri.http(
        Config.backend, "api/posts/get_attachment_info", {"attachment_id": id});
    try {
      final response = await http.get(url);
      return AttachmentInfo.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<void> delete(String id) async {
    final url = Uri.http(Config.backend, "api/posts/delete_post", {
      "id": id,
    });
    try {
      await http.delete(url);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
