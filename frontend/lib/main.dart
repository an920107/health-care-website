import 'dart:async';

import 'package:flutter/material.dart' hide Router;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:health_care_website/router/router.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/private/carousel_page_view_model.dart';
import 'package:health_care_website/view_model/private/insurance_edit_page_view_model.dart';
import 'package:health_care_website/view_model/private/insurance_list_page_view_model.dart';
import 'package:health_care_website/view_model/private/permission_page_view_model.dart';
import 'package:health_care_website/view_model/private/post_edit_page_view_model.dart';
import 'package:health_care_website/view_model/private/post_list_page_view_model.dart';
import 'package:health_care_website/view_model/private/restaurant_edit_page_view_model.dart';
import 'package:health_care_website/view_model/private/restaurant_list_page_view_model.dart';
import 'package:health_care_website/view_model/private/static_page_edit_page_view_model.dart';
import 'package:health_care_website/view_model/public/home_page_view_model.dart';
import 'package:health_care_website/view_model/public/post_page_view_model.dart';
import 'package:health_care_website/view_model/public/restaurant_page_view_model.dart';
import 'package:health_care_website/view_model/public/static_page_page_view_model.dart';
import 'package:provider/provider.dart';
import 'package:url_strategy/url_strategy.dart';

Future<void> main() async {
  // 讓網址後方不會出現 `#`
  setPathUrlStrategy();

  WidgetsFlutterBinding.ensureInitialized();

  // Go_Router 8.0.0 migration
  GoRouter.optionURLReflectsImperativeAPIs = true;

  // Load .env vars
  await dotenv.load(fileName: ".env");

  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (_) => PlatformViewModel()),
        ChangeNotifierProvider(create: (_) => AuthViewModel()),
        ChangeNotifierProvider(create: (_) => CarouselPageViewModel()),
        ChangeNotifierProvider(create: (_) => PostEditPageViewModel()),
        ChangeNotifierProvider(create: (_) => PostListPageViewModel()),
        ChangeNotifierProvider(create: (_) => StaticPageEditPageViewModel()),
        ChangeNotifierProvider(create: (_) => RestaurantListPageViewModel()),
        ChangeNotifierProvider(create: (_) => RestaurantEditPageViewModel()),
        ChangeNotifierProvider(create: (_) => InsuranceListPageViewModel()),
        ChangeNotifierProvider(create: (_) => InsuranceEditPageViewModel()),
        ChangeNotifierProvider(create: (_) => HomePageViewModel()),
        ChangeNotifierProvider(create: (_) => PostPageViewModel()),
        ChangeNotifierProvider(create: (_) => RestaurantPageViewModel()),
        ChangeNotifierProvider(create: (_) => StaticPagePageViewModel()),
        ChangeNotifierProvider(create: (_) => PermissionPageViewModel()),
      ],
      child: MaterialApp.router(
        debugShowCheckedModeBanner: false,
        title: "Health Care Website",
        theme: ThemeData(
          // textTheme:
          //     GoogleFonts.notoSansTcTextTheme(Theme.of(context).textTheme),
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.amber),
          useMaterial3: true,
        ),
        routerConfig: Router.router,
      ),
    );
  }
}
