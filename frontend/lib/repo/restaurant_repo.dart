import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/restaurant_inspection_item.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/blob/attachment_response.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/model/restaurant/restaurant_response.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

abstract class RestaurantRepo {
  static Future<Restaurant?> getRestaurant(String id) async {
    final url = Uri.https(Config.backend, "/api/restaurant_post/$id");
    try {
      final response = await http.get(url);
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<RestaurantResponse?> getRestaurants({int? page}) async {
    final url = Uri.https(Config.backend, "/api/restaurant_post", {
      if (page != null) "page": page,
    });
    try {
      final response = await http.get(url);
      return RestaurantResponse.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<Restaurant?> createRestaurant() async {
    final url = Uri.https(Config.backend, "/api/restaurant_post");
    try {
      final response = await http.post(url,
          body: Restaurant(
            id: "",
            title: "New Restaurant",
            attachments: json.encode([]),
            item: RestaurantInspectionItem.values.first,
            viewer: 0,
            visible: false,
            valid: false,
            inspectTime: DateTime.now(),
            createTime: DateTime.now(),
            updateTime: DateTime.now(),
          ).toJson());
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<Restaurant?> updateRestaurant(Restaurant restaurant) async {
    final url = Uri.https(Config.backend, "/api/restaurant_post/${restaurant.id}");
    try {
      final response = await http.put(url, body: restaurant.toJson());
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<AttachmentResponse?> uploadAttachment(
      String id, Uint8List file, String filename) async {
    final url = Uri.https(Config.backend, "/api/restaurant_post/$id/attachment");
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
    final url = Uri.https(Config.backend, "/api/attachment/restaurant_post/$id/info");
    try {
      final response = await http.get(url);
      return AttachmentInfo.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
      return null;
    }
  }

  static Future<void> delete(String id) async {
    final url = Uri.https(Config.backend, "/api/restaurant_post/$id");
    try {
      await http.delete(url);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<void> deleteAttachment(String id) async {
    final url = Uri.https(Config.backend, "/api/attachment/restaurant_post/$id");
    try {
      await http.delete(url);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Uri getStatsUrl(DateTime start, DateTime end) {
    return Uri.https(Config.backend, "/api/restaurant_post/stats", {
      "start_date": DateFormat("yyyy-MM-dd").format(start),
      "end_date": DateFormat("yyyy-MM-dd").format(end),
    });
  }
}
