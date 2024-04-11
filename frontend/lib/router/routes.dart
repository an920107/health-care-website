enum Routes {
  root("/"),
  post("/post"),
  restaurant("/restaurant"),
  page("/page"),
  login("/login"),
  logout("/logout"),
  redirect("/redirect"),
  admin("/admin"),
  carousel("/admin/carousel"),
  pageEdit("/admin/page/edit"),
  restaurantList("/admin/restaurant"),
  restaurantEdit("/admin/restaurant/edit"),
  postList("/admin/post"),
  postEdit("/admin/post/edit"),
  permission("/admin/permission");

  final String path;

  const Routes(this.path);
}
