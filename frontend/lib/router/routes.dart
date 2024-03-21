enum Routes {
  root("/"),
  post("/post"),
  page("/page"),
  login("/login"),
  redirect("/redirect"),
  admin("/admin"),
  carousel("/admin/carousel"),
  pageEdit("/admin/page/edit"),
  restaurantList("/admin/restaurant"),
  restaurantEdit("/admin/restaurant/edit"),
  postList("/admin/post"),
  postEdit("/admin/post/edit");

  final String path;

  const Routes(this.path);
}
