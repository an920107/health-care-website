import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/model/carousel/caroousel_info.dart';
import 'package:http/http.dart' as http;

abstract class CarouselRepo {
  static Future<void> uploadImage(Uint8List file, String filename) async {
    final url = Uri.https(Config.backend, "/api/carousels/carousel");
    try {
      final request = http.MultipartRequest("POST", url);
      request.files.add(http.MultipartFile.fromBytes(
        "blob_carousel",
        file,
        filename: filename,
      ));
      final streamResponse = await request.send();
      final response = (await http.Response.fromStream(streamResponse));
      if (response.statusCode != 200) throw Exception();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<List<CarouselInfo>> getImages() async {
    final url = Uri.https(Config.backend, "/api/carousels/carousel");
    try {
      final response = await http.get(url);
      return (json.decode(response.body)["response"] as List)
          .map((e) => CarouselInfo.fromJson(e))
          .toList();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return [];
    }
  }

  static Future<void> deleteImage(String id) async {
    final url = Uri.https(Config.backend, "/api/carousels/carousel", {
      "carousel_id": id,
    });
    try {
      final response = await http.delete(url);
      if (response.statusCode != 200) throw Exception();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
