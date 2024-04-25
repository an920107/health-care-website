import 'package:health_care_website/enum/user_role.dart';

enum Routes {
  root("/", UserRole.none),
  post("/post", UserRole.none),
  restaurant("/restaurant", UserRole.none),
  page("/page", UserRole.none),
  login("/login", UserRole.none),
  logout("/logout", UserRole.none),
  redirect("/redirect", UserRole.none),
  carousel("/admin/carousel", UserRole.studentB),
  pageEdit("/admin/page/edit", UserRole.studentB),
  restaurantList("/admin/restaurant", UserRole.studentB),
  restaurantEdit("/admin/restaurant/edit", UserRole.studentB),
  postList("/admin/post", UserRole.studentB),
  postEdit("/admin/post/edit", UserRole.studentB),
  insuranceList("/admin/insurance", UserRole.studentB),
  insuranceEdit("/admin/insurance/edit", UserRole.studentB),
  permission("/admin/permission", UserRole.admin);

  final String path;
  final UserRole roleRequired;

  const Routes(this.path, this.roleRequired);
}
