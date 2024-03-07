enum Routes {
  root("/"),
  post("/post"),
  login("/login"),
  redirect("/redirect"),
  edit("/admin/edit"),
  postList("/admin/post_list");

  final String path;

  const Routes(this.path);
}
