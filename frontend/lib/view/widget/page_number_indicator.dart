import 'package:flutter/material.dart';

class PageNumberIndicator extends StatelessWidget {
  const PageNumberIndicator({
    super.key,
    required this.currentPage,
    this.smallDelta = 1,
    this.bigDelta = 5,
    required this.totalPage,
    required this.onAdjust,
  });

  final int currentPage;
  final int totalPage;
  final int smallDelta;
  final int bigDelta;
  final void Function(int increment) onAdjust;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        IconButton(
          onPressed: () => onAdjust(-5),
          icon: const Icon(Icons.keyboard_double_arrow_left),
          tooltip: "-$bigDelta",
        ),
        IconButton(
          onPressed: () => onAdjust(-1),
          icon: const Icon(Icons.keyboard_arrow_left),
          tooltip: "-$smallDelta",
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Text("$currentPage / $totalPage"),
        ),
        IconButton(
          onPressed: () => onAdjust(1),
          icon: const Icon(Icons.keyboard_arrow_right),
          tooltip: "+$smallDelta",
        ),
        IconButton(
          onPressed: () => onAdjust(5),
          icon: const Icon(Icons.keyboard_double_arrow_right),
          tooltip: "+$bigDelta",
        ),
      ],
    );
  }
}
