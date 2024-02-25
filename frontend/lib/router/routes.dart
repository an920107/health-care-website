enum Routes {
  root("/"),
  post("/post"),
  edit("/admin/edit"),
  postList("/admin/post_list");

  final String path;

  const Routes(this.path);
}
