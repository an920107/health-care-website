import 'dart:async';

import 'package:flutter/material.dart';
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
