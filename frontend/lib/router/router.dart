import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/page/private/admin_page.dart';
import 'package:health_care_website/view/page/private/carousel_page.dart';
import 'package:health_care_website/view/page/private/page_edit_page.dart';
import 'package:health_care_website/view/page/private/page_list_page.dart';
import 'package:health_care_website/view/page/private/restaurant_edit_page.dart';
import 'package:health_care_website/view/page/private/restaurant_list_page.dart';
import 'package:health_care_website/view/page/public/home_page.dart';
import 'package:health_care_website/view/page/private/post_edit_page.dart';
import 'package:health_care_website/view/page/private/post_list_page.dart';
import 'package:health_care_website/view/page/public/post_page.dart';
import 'package:health_care_website/view/page/public/redirect_page.dart';

class Router {
  static GoRouter get router => GoRouter(
        initialLocation: Routes.root.path,
        routes: [
          // 前台
          GoRoute(
            path: Routes.root.path,
            builder: (context, state) => const HomePage(),
          ),
          GoRoute(
            path: "${Routes.post.path}/:id",
            builder: (context, state) => PostPage(state.pathParameters["id"]!),
          ),

          // 後台
          GoRoute(
            path: Routes.admin.path,
            builder: (context, state) => const AdminPage(),
          ),
          GoRoute(
            path: Routes.carousel.path,
            builder: (context, state) => const CarouselPage(),
          ),
          GoRoute(
            path: Routes.postList.path,
            builder: (context, state) => const PostListPage(),
          ),
          GoRoute(
            path: "${Routes.postEdit.path}/:id",
            builder: (context, state) =>
                PostEditPage(state.pathParameters["id"]!),
          ),
          GoRoute(
            path: Routes.restaurantList.path,
            builder: (context, state) => const RestaurantListPage(),
          ),
          GoRoute(
            path: "${Routes.restaurantEdit.path}/:id",
            builder: (context, state) =>
                RestaurantEditPage(state.pathParameters["id"]!),
          ),
          GoRoute(
            path: Routes.pageList.path,
            builder: (context, state) => const PageListPage(),
          ),
          GoRoute(
            path: "${Routes.pageEdit.path}/:id",
            builder: (context, state) =>
                PageEditPage(state.pathParameters["id"]!),
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
