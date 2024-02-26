import 'package:flutter/material.dart';

abstract class OutlinedButtonStyle {
  static ButtonStyle rRectStyle({
    double radius = 4,
    double padding = 20,
  }) {
    return OutlinedButton.styleFrom(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(radius),
      ),
      padding: EdgeInsets.all(padding),
    );
  }
}

abstract class TextButtonStyle {
  static ButtonStyle rRectStyle({
    double radius = 4,
    double padding = 20,
  }) {
    return TextButton.styleFrom(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(radius),
      ),
      padding: EdgeInsets.all(padding),
    );
  }
}

abstract class ElevatedButtonStyle {
  static ButtonStyle rRectStyle({
    double radius = 4,
    double padding = 20,
  }) {
    return ElevatedButton.styleFrom(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(radius),
      ),
      padding: EdgeInsets.all(padding),
    );
  }
}
