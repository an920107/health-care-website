import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/restaurant_inspection_item.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/blob/attachment_response.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/model/restaurant/restaurant_response.dart';
import 'package:health_care_website/util/http_util.dart';
import 'package:intl/intl.dart';

abstract class RestaurantRepo {
  static Future<Restaurant?> getRestaurant(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/restaurant_post/$id",
      );
      response.check();
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<RestaurantResponse?> getRestaurants(
      {int? page, bool hideVisible = true}) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/restaurant_post",
        query: {
          if (page != null) "page": page.toString(),
          if (hideVisible) "visible": "1",
        },
      );
      response.check();
      return RestaurantResponse.fromJson(
          json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<Restaurant?> createRestaurant() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.post,
        uri: "/api/restaurant_post",
        authRequired: true,
        body: Restaurant(
          id: "",
          title: "New Restaurant",
          attachments: json.encode([]),
          category: RestaurantInspectionCategory.values.first,
          item: "",
          viewer: 0,
          visible: false,
          valid: false,
          inspectTime: DateTime.now(),
          createTime: DateTime.now(),
          updateTime: DateTime.now(),
        ).toJson(),
      );
      response.check();
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<Restaurant?> updateRestaurant(Restaurant restaurant) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.put,
        uri: "/api/restaurant_post/${restaurant.id}",
        authRequired: true,
        body: restaurant.toJson(),
      );
      response.check();
      return Restaurant.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<AttachmentResponse?> uploadAttachment(
    String id,
    Uint8List blob,
    String filename,
  ) async {
    try {
      final response = await HttpUtil.upload(
        uri: "/api/restaurant_post/$id/attachment",
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

  static Future<AttachmentInfo?> getAttachmentInfo(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/attachment/restaurant_post/$id/info",
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
        uri: "/api/restaurant_post/$id",
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
        uri: "/api/attachment/restaurant_post/$id",
        authRequired: true,
      );
      response.check();
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
