import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/view/widget/clean_button.dart';

/// 這個物件僅能前往同個站點的其他 route，若要前往外站，
/// 請使用 `launch_url` 提供的 `Link`
class LinkText extends StatelessWidget {
  const LinkText({
    super.key,
    required this.path,
    required this.label,
    this.style,
  });

  final String path;
  final String label;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    return CleanButton(
      onPressed: () => context.go(path),
      child: Text(
        label,
        overflow: TextOverflow.fade,
        softWrap: false,
        style: style?.copyWith(decoration: TextDecoration.underline) ??
            const TextStyle(decoration: TextDecoration.underline),
      ),
    );
  }
}
