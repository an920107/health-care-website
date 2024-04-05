// ignore_for_file: avoid_web_libraries_in_flutter

import 'dart:html';

import 'package:intl/intl.dart';

abstract class CookieManager {
  static final _gmtFormat = DateFormat("EEE, dd MMM yyyy HH:mm:ss 'GMT'");

  static Map<String, String?> getAll() {
    if (document.cookie == "") return {};
    final cookies = {
      for (var e
          in (document.cookie ?? "").split("; ").map((e) => e.split("=")))
        e[0]: e[1] != "" ? e[1] : null
    };
    return cookies;
  }

  static String? get(String key) {
    return getAll()[key];
  }

  static void set(String key, String value, DateTime expires) {
    document.cookie =
        "$key=$value; expires=${_gmtFormat.format(expires.toUtc())}; path=/";
  }

  static void clear(String key) {
    set(key, "", DateTime.now());
  }
}
