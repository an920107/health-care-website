class StaticPage {
  String id;
  String content;
  String attachments;
  int viewer;
  DateTime createTime;
  DateTime updateTime;

  StaticPage({
    required this.id,
    required this.content,
    required this.attachments,
    required this.viewer,
    required this.createTime,
    required this.updateTime,
  });

  factory StaticPage.fromJson(Map<String, dynamic> json) => StaticPage(
        id: json["id"],
        content: json["content"] ?? "[{\"insert\":\"\\n\"}]",
        attachments: json["attachments"] ?? "",
        viewer: int.parse(json["viewer"]),
        createTime: DateTime.now(), //DateTime.parse(json["create_time"]),
        updateTime: DateTime.now(), //DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "content": content,
        "attachments": attachments,
        "viewer": viewer.toString(),
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
