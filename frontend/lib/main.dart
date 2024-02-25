import 'dart:async';

import 'package:flutter/material.dart' hide Router;
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/router.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/private/post_editor_page_view_model.dart';
import 'package:health_care_website/view_model/private/post_list_page_view_model.dart';
import 'package:provider/provider.dart';
import 'package:url_strategy/url_strategy.dart';

Future<void> main() async {
  // 讓網址後方不會出現 `#`
  setPathUrlStrategy();

  WidgetsFlutterBinding.ensureInitialized();

  // Go_Router 8.0.0 migration
  GoRouter.optionURLReflectsImperativeAPIs = true;

  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (_) => PlatformViewModel()),
        ChangeNotifierProvider(create: (_) => PostEditorPageViewModel()),
        ChangeNotifierProvider(create: (_) => PostListPageViewModel()),
      ],
      child: MaterialApp.router(
        debugShowCheckedModeBanner: false,
        title: "Health Care Website",
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.amber),
          useMaterial3: true,
        ),
        routerConfig: Router.router,
      ),
    );
  }
}
