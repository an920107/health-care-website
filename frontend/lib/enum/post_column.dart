enum PostColumn {
  latest("最新消息"),
  activity("活動快訊"),
  health("健康焦點"),
  nutrition("營養報報");

  final String label;

  const PostColumn(this.label);
}