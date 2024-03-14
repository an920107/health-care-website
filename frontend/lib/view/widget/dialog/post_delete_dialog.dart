import 'package:flutter/material.dart';

class DeleteDialog extends StatelessWidget {
  const DeleteDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      icon: const Icon(Icons.warning),
      title: const Text("確定要刪除嗎"),
      content: const Text(
        "刪除之後將永遠無法復原",
        textAlign: TextAlign.center,
      ),
      actionsAlignment: MainAxisAlignment.center,
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(null),
          child: const Text("取消"),
        ),
        TextButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: Text(
            "刪除",
            style: TextStyle(color: Theme.of(context).colorScheme.error),
          ),
        ),
      ],
    );
  }
}
