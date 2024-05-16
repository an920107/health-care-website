import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/model/dengue/building.dart';
import 'package:health_care_website/model/dengue/dengue.dart';
import 'package:health_care_website/util/http_util.dart';
import 'package:intl/intl.dart';

abstract class DengueRepo {
  static Future<void> uploadForm(
    String buildingId,
    DateTime inspectDate,
    Map<String, dynamic> form,
  ) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.post,
        uri: "/api/dengue/form",
        authRequired: true,
        body: {
          "building": buildingId,
          "create_year_month": inspectDate.toIso8601String().substring(0, 7),
          "json_data": json.encode(form),
        },
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<Building?> getBuilding(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        authRequired: true,
        uri: "/api/dengue/building/$id",
      );
      response.check();
      return Building.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<List<Building>> getBuildings([String? userId]) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        authRequired: true,
        uri: "/api/dengue/building",
        query: {
          if (userId != null) "user_id": userId,
        },
      );
      response.check();
      return (json.decode(response.body)["response"] as List)
          .map((e) => Building.fromJson(e))
          .toList();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return [];
  }

  static Future<Building?> createBuilding(String name) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.post,
        uri: "/api/dengue/building",
        authRequired: true,
        body: {
          "chinese_name": name,
          "user_id": "",
        },
      );
      response.check();
      return Building.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<void> deleteBuilding(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/dengue/building/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<void> patchBuildingUser(String id, String userId) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.patch,
        uri: "/api/dengue/building/$id",
        authRequired: true,
        body: {"user_id": userId},
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<Dengue?> getDengue(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/dengue/form/$id",
        authRequired: true,
      );
      response.check();
      return Dengue.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }

  static Future<List<Dengue>> getDengues([String? userId]) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/dengue/form",
        authRequired: true,
        query: {
          if (userId != null) "user_id": userId,
        },
      );
      response.check();
      return (json.decode(response.body)["response"] as List)
          .map((e) => Dengue.fromJson(e))
          .toList();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return [];
  }

  static Future<void> deleteDengue(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/dengue/form/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<Map<String, bool>> getFilledStatus() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/dengue/form-status",
        authRequired: true,
      );
      response.check();
      return (json.decode(response.body)["response"] as Map)
          .map((key, value) => MapEntry(key, value == "1"));
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return {};
  }

  static Uri getStatsUrl(DateTime start, DateTime end) {
    return Uri.https(Config.backend, "/api/dengue/form-download", {
      "start_date": DateFormat("yyyy-MM").format(start),
      "end_date": DateFormat("yyyy-MM").format(end),
    });
  }

  static Uri getStatsUrlById(String id) {
    return Uri.https(Config.backend, "/api/dengue/form-download/$id");
  }
}
