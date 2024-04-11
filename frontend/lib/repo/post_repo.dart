import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/enum/post_column.dart';
import 'package:health_care_website/extension/boolean_extension.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/blob/attachment_response.dart';
import 'package:health_care_website/model/blob/image_response.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/model/post/post_response.dart';
import 'package:health_care_website/util/http_util.dart';

abstract class PostRepo {
  static Future<Post?> getPost(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/post/$id",
      );
      response.check();
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<PostResponse?> getPosts(
      {PostColumn? column, int? page, bool hideVisible = false}) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/post",
        query: {
          if (column != null) "column": column.name,
          if (page != null) "page": page.toString(),
          if (hideVisible) "visible": "1",
        },
      );
      response.check();
      return PostResponse.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<Post?> createPost() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.post,
        uri: "/api/post",
        authRequired: true,
        body: Post(
          id: "",
          title: "New Post",
          column: PostColumn.activity,
          content: json.encode([
            {"insert": "\n"}
          ]),
          attachments: json.encode([]),
          viewer: 0,
          visible: false,
          importance: false,
          createTime: DateTime.now(),
          updateTime: DateTime.now(),
        ).toJson(),
      );
      response.check();
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<Post?> updatePost(Post post) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.put,
        uri: "/api/post/${post.id}",
        authRequired: true,
        body: post.toJson(),
      );
      response.check();
      return Post.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<bool> togglePostImportance(String id, bool value) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.patch,
        uri: "/api/post/$id/importance",
        authRequired: true,
        body: {"importance": (!value).toZeroOne().toString()},
      );
      response.check();
      return Post.fromJson(json.decode(response.body)["response"]).importance;
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return value;
  }

  static Future<AttachmentResponse?> uploadAttachment(
    String id,
    Uint8List blob,
    String filename,
  ) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/post/$id/attachment",
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
    String id,
    Uint8List blob,
    String filename,
  ) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/post/$id/image",
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
        uri: "/api/attachment/post/$id/info",
      );
      response.check();
      return AttachmentInfo.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<void> delete(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/post/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<void> deleteAttachment(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/attachment/post/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
