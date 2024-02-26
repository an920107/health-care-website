import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view_model/private/post_editor_page_view_model.dart';
import 'package:provider/provider.dart';

class PostDeleteDialog extends StatelessWidget {
  const PostDeleteDialog({super.key});

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
          onPressed: () => Navigator.of(context).pop(),
          child: const Text("取消"),
        ),
        TextButton(
          onPressed: () async {
            await context.read<PostEditorPageViewModel>().delete();
            if (context.mounted) {
              context.pushReplacement(Routes.postList.path);
            }
          },
          child: Text(
            "刪除",
            style: TextStyle(color: Theme.of(context).colorScheme.error),
          ),
        ),
      ],
    );
  }
}
