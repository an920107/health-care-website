import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/home_page.dart';
import 'package:health_care_website/view/private/post_editor_page.dart';
import 'package:health_care_website/view/private/post_list_page.dart';

class Router {
  static GoRouter get router => GoRouter(
        initialLocation: Routes.root.path,
        routes: [
          GoRoute(
            path: Routes.root.path,
            builder: (context, state) => const HomePage(),
          ),
          // GoRoute(
          //   path: "${Routes.post.path}/:id",
          //   builder: (context, state) =>
          //       PostEditorPage(state.pathParameters["id"]!),
          // ),
          GoRoute(
            path: Routes.postList.path,
            builder: (context, state) => const PostListPage(),
          ),
          GoRoute(
            path: "${Routes.edit.path}/:id",
            builder: (context, state) =>
                PostEditorPage(state.pathParameters["id"]!),
          ),
        ],
      );
}
