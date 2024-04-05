import 'dart:async';

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
  late Future<void> Function() loginFutureCallback;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    loginFutureCallback = context.read<AuthViewModel>().login;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder(
            future: loginFutureCallback().then((_) {
              context.pushReplacement(Routes.root.path);
            }),
            builder: (context, snapshot) {
              return const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(width: 30),
                  Text(
                    "登入中......",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              );
            }),
      ),
    );
  }
}
