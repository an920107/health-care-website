import 'dart:async';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';
import 'package:provider/provider.dart';

class RedirectPage extends StatefulWidget {
  const RedirectPage({super.key});

  @override
  State<RedirectPage> createState() => _RedirectPageState();
}

class _RedirectPageState extends State<RedirectPage> {
  final _authCompleter = Completer();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      context
          .read<AuthViewModel>()
          .getAccessToken()
          .then((_) => _authCompleter.complete());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder(
            future: _authCompleter.future,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Text(
                  "登入中......",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                );
              }

              final isLoggedIn = context.read<AuthViewModel>().isLoggedIn;

              return RichText(
                text: TextSpan(
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                  children: [
                    TextSpan(text: isLoggedIn ? "登入成功！" : "登入失敗！"),
                    TextSpan(
                      text: isLoggedIn ? "按此前往管理員後台" : "按此嘗試重新登入",
                      style: const TextStyle(
                        color: Colors.blue,
                        decoration: TextDecoration.underline,
                      ),
                      // TODO: 改成後台連結
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => context.go(isLoggedIn
                            ? Routes.postList.path
                            : Routes.login.path),
                    ),
                    const TextSpan(text: "。"),
                  ],
                ),
              );

              // return context.read<AuthViewModel>().isLoggedIn
              //     ? RichText(text: text)
              //     : RichText(text: text);
            }),
      ),
    );
  }
}
