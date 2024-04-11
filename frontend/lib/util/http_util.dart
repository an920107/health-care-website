import 'dart:typed_data';

import 'package:health_care_website/config.dart';
import 'package:health_care_website/repo/auth_repo.dart';
import 'package:health_care_website/util/cookie_manager.dart';
import 'package:http/http.dart' as http;

abstract class HttpUtil {
  static Future<http.Response> request({
    required HttpMethod method,
    required String uri,
    bool authRequired = false,
    Map<String, String>? headers,
    Map<String, String>? query,
    Map<String, dynamic>? body,
  }) async {
    assert(![HttpMethod.get, HttpMethod.delete].contains(method) || body == null,
        "When using HTTP GET and DELETE, `data` cannot be set.");

    final url = Uri.https(Config.backend, uri, query);
    if (authRequired) {
      headers ??= {};
      headers["Authorization"] = "Bearer ${CookieManager.get("token")}";
      await AuthRepo.refreshToken();
    }

    switch (method) {
      case HttpMethod.get:
        return await http.get(url, headers: headers);
      case HttpMethod.put:
        return await http.put(url, headers: headers, body: body);
      case HttpMethod.post:
        return await http.post(url, headers: headers, body: body);
      case HttpMethod.delete:
        return await http.delete(url, headers: headers);
      case HttpMethod.patch:
        return await http.patch(url, headers: headers, body: body);
    }
  }

  static Future<http.Response> upload({
    required String uri,
    required String field,
    required String filename,
    required Uint8List blob,
    bool authRequired = false,
    Map<String, String>? headers,
    Map<String, String>? query,
  }) async {
    final url = Uri.https(Config.backend, uri, query);
    if (authRequired) {
      headers ??= {};
      headers["Authorization"] = "Bearer ${CookieManager.get("token")}";
      await AuthRepo.refreshToken();
    }

    final request = http.MultipartRequest("POST", url);
    if (headers != null) request.headers.addAll(headers);
    request.files
        .add(http.MultipartFile.fromBytes(field, blob, filename: filename));
    final streamResponse = await request.send();
    return await http.Response.fromStream(streamResponse);
  }
}

extension ResponseExtension on http.Response {
  /// Throws [HttpRequestException] when the status code of the response is
  /// not in [avialableCodes] which is `[200]` in default.
  void check([List<int>? avialableCodes]) {
    avialableCodes ??= [200];
    if (!avialableCodes.contains(statusCode)) {
      throw HttpRequestException(this);
    }
  }
}

enum HttpMethod {
  get,
  put,
  post,
  delete,
  patch;
}

class HttpRequestException implements Exception {
  final http.Response _response;

  int get statusCode => _response.statusCode;
  String get body => _response.body;

  HttpRequestException(http.Response response) : _response = response;

  @override
  String toString() {
    return "$runtimeType: ($statusCode) The server returns $body.";
  }
}
