import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/model/carousel/caroousel_info.dart';
import 'package:health_care_website/util/http_util.dart';

abstract class CarouselRepo {
  static Future<void> uploadImage(Uint8List blob, String filename) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/carousel",
        field: "blob_attachment",
        filename: filename,
        blob: blob,
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<List<CarouselInfo>> getImages() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/carousel",
      );
      response.check();
      return (json.decode(response.body)["response"] as List)
          .map((e) => CarouselInfo.fromJson(e))
          .toList();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return [];
  }

  static Future<void> deleteImage(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/carousel/$id",
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
