import 'package:flutter/material.dart';

class InspectResultCard extends StatelessWidget {
  const InspectResultCard(
    this.value, {
    super.key,
  });

  final bool value;

  @override
  Widget build(BuildContext context) {
    return value
        ? Card(
            color: Colors.lightGreen.shade100,
            child: const Padding(
              padding: EdgeInsets.symmetric(
                vertical: 4,
                horizontal: 12,
              ),
              child: Text("合　格"),
            ),
          )
        : Card(
            color: Theme.of(context).colorScheme.errorContainer,
            child: const Padding(
              padding: EdgeInsets.symmetric(
                vertical: 4,
                horizontal: 12,
              ),
              child: Text("不合格"),
            ),
          );
  }
}
