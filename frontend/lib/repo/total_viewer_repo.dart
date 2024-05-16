import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:health_care_website/model/viewer/total_viewer.dart';
import 'package:health_care_website/util/http_util.dart';

abstract class TotalViewerRepo {
  static Future<TotalViewer?> getTotalViewer() async {
    try {
      final response = await HttpUtil.request(
        method: HttpMethod.get,
        uri: "/api/total_viewer",
      );
      response.check();
      return TotalViewer.fromJson(json.decode(response.body)["response"]);
    } on Exception catch (e) {
      if (kDebugMode) print(e);
    }
    return null;
  }
}
