import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/enum/user_role.dart';
import 'package:health_care_website/model/user/user.dart';
import 'package:health_care_website/util/http_util.dart';

abstract class UserRepo {
  static Future<List<User>> getUsers() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/user",
        authRequired: true,
      );
      response.check();
      final result = (json.decode(response.body)["response"] as List)
          .map((e) => User.fromJson(e))
          .toList();
      return result;
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return [];
  }

  static Future<void> updatePermission(String id, UserRole role) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.patch,
        uri: "/api/user/$id/authorization",
        authRequired: true,
        body: {"authorization": role.code.toString()},
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }

  static Future<void> deleteUser(String id) async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.delete,
        uri: "/api/user/$id",
        authRequired: true,
      );
      response.check();
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
  }
}
