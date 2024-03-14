enum Routes {
  root("/"),
  post("/post"),
  login("/login"),
  redirect("/redirect"),
  admin("/admin"),
  carousel("/admin/carousel"),
  pageList("/admin/page"),
  pageEdit("/admin/page/edit"),
  restaurantList("/admin/restaurant"),
  restaurantEdit("/admin/restaurant/edit"),
  postList("/admin/post"),
  postEdit("/admin/post/edit");

  final String path;

  const Routes(this.path);
}
