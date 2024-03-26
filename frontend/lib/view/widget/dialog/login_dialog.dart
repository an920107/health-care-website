import 'package:flutter/material.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class LoginDialog extends StatelessWidget {
  const LoginDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const IconText(
        icon: Icon(Icons.person),
        child: Text("登入"),
      ),
      content: ElevatedButton(
        onPressed: () {
          launchUrl(
            context.read<AuthViewModel>().ncuPortalOAuthUrl,
            webOnlyWindowName: "_self", // 在同個分頁開啟
          ).then((value) => Navigator.of(context).pop());
        },
        child: const Text("計中 OAuth 認證"),
      ),
    );
  }
}
