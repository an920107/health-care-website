import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/page/public/home_page.dart';
import 'package:health_care_website/view/page/private/post_editor_page.dart';
import 'package:health_care_website/view/page/private/post_list_page.dart';
import 'package:health_care_website/view/page/public/redirect_page.dart';

class Router {
  static GoRouter get router => GoRouter(
        initialLocation: Routes.root.path,
        routes: [
          GoRoute(
            path: Routes.root.path,
            builder: (context, state) => const HomePage(),
          ),
          GoRoute(
            path: Routes.postList.path,
            builder: (context, state) => const PostListPage(),
          ),
          GoRoute(
            path: "${Routes.edit.path}/:id",
            builder: (context, state) =>
                PostEditorPage(state.pathParameters["id"]!),
          ),

          // 登入相關
          GoRoute(
            path: Routes.login.path,
            builder: (context, state) => const HomePage(toLogin: true),
          ),
          GoRoute(
            path: Routes.redirect.path,
            builder: (context, state) => const RedirectPage(),
          )
        ],
      );
}
