import 'package:flutter/widgets.dart';

class HoverableWidget extends StatefulWidget {
  const HoverableWidget({
    super.key,
    required this.showOnHovered,
    required this.child
  });

  final Widget child;
  final Positioned showOnHovered;

  @override
  State<HoverableWidget> createState() => _HoverableWidgetState();
}

class _HoverableWidgetState extends State<HoverableWidget> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: Stack(
        children: [
          Positioned.fill(child: widget.child),
          if (_isHovered)
            widget.showOnHovered,
        ],
      ),
    );
  }
}
