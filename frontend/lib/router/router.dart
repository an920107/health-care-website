import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/enum/user_role.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/page/private/carousel_page.dart';
import 'package:health_care_website/view/page/private/dengue_form_page.dart';
import 'package:health_care_website/view/page/private/dengue_management_page.dart';
import 'package:health_care_website/view/page/private/insurance_edit_page.dart';
import 'package:health_care_website/view/page/private/insurance_list_page.dart';
import 'package:health_care_website/view/page/private/permission_page.dart';
import 'package:health_care_website/view/page/private/static_page_edit_page.dart';
import 'package:health_care_website/view/page/private/restaurant_edit_page.dart';
import 'package:health_care_website/view/page/private/restaurant_list_page.dart';
import 'package:health_care_website/view/page/public/home_page.dart';
import 'package:health_care_website/view/page/private/post_edit_page.dart';
import 'package:health_care_website/view/page/private/post_list_page.dart';
import 'package:health_care_website/view/page/public/post_page.dart';
import 'package:health_care_website/view/page/public/redirect_page.dart';
import 'package:health_care_website/view/page/public/restaurant_page.dart';
import 'package:health_care_website/view/page/public/static_page_page.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';
import 'package:provider/provider.dart';

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
          GoRoute(
            path: "${Routes.restaurant.path}/:id",
            builder: (context, state) =>
                RestaurantPage(state.pathParameters["id"]!),
          ),
          GoRoute(
            path: "${Routes.page.path}/:id",
            builder: (context, state) =>
                StaticPagePage(state.pathParameters["id"]!),
          ),
          GoRoute(
            path: Routes.dengueForm.path,
            builder: (context, state) => const DengueFormPage(),
            redirect: _authCheckAndRedirect,
          ),

          // 後台
          GoRoute(
            path: Routes.carousel.path,
            builder: (context, state) => const CarouselPage(),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.postList.path,
            builder: (context, state) => const PostListPage(),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: "${Routes.postEdit.path}/:id",
            builder: (context, state) =>
                PostEditPage(state.pathParameters["id"]!),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.restaurantList.path,
            builder: (context, state) => const RestaurantListPage(),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: "${Routes.restaurantEdit.path}/:id",
            builder: (context, state) =>
                RestaurantEditPage(state.pathParameters["id"]!),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.pageEdit.path,
            redirect: (context, state) =>
                "${Routes.pageEdit.path}/${PageTopic.values.first.id}",
          ),
          GoRoute(
            path: "${Routes.pageEdit.path}/:id",
            builder: (context, state) {
              final topic = PageTopic.values.firstWhere(
                (e) => e.id == state.pathParameters["id"]!,
                orElse: () => PageTopic.values.first,
              );
              return StaticPageEditPage(topic);
            },
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.permission.path,
            builder: (context, state) => const PermissionPage(),
            redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.insuranceList.path,
            builder: (context, state) => const InsuranceListPage(),
            // redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: "${Routes.insuranceEdit.path}/:id",
            builder: (context, state) =>
                InsuranceEditPage(state.pathParameters["id"]!),
            // redirect: _authCheckAndRedirect,
          ),
          GoRoute(
            path: Routes.dengueManagement.path,
            builder: (context, state) => const DengueManagementPage(),
            // redirect: _authCheckAndRedirect,
          ),

          // 登入相關
          GoRoute(
            path: Routes.login.path,
            builder: (context, state) => const HomePage(loginOrLogout: true),
          ),
          GoRoute(
            path: Routes.logout.path,
            builder: (context, state) => const HomePage(loginOrLogout: false),
          ),
          GoRoute(
            path: Routes.redirect.path,
            builder: (context, state) => const RedirectPage(),
          )
        ],
      );

  static String? _authCheckAndRedirect(
    BuildContext context,
    GoRouterState state,
  ) {
    UserRole? roleRequired;
    final fullPath = state.fullPath ?? "";
    for (var route in List.from(Routes.values)
      ..sort((a, b) => b.path.length.compareTo(a.path.length))) {
      if (fullPath.startsWith(route.path)) {
        roleRequired = route.roleRequired;
        break;
      }
    }
    if (roleRequired == null) return Routes.root.path;
    final role = context.read<AuthViewModel>().role;
    return role < roleRequired ? Routes.root.path : null;
  }
}
