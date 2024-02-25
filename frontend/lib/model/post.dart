import 'package:health_care_website/extension/boolean_extension.dart';

class Post {
  String id;
  String title;
  // String author;
  PostColumn column;
  String content;
  bool visible;
  DateTime createTime;
  DateTime updateTime;

  Post({
    required this.id,
    required this.title,
    required this.column,
    required this.content,
    required this.visible,
    required this.createTime,
    required this.updateTime,
  });

  factory Post.fromJson(Map<String, dynamic> json) => Post(
        id: json["id"],
        title: json["title"],
        column: PostColumn.values.where((e) => e.name == json["column"]).first,
        content: json["content"] ?? "",
        visible: json["visible"] == "1" ? true : false,
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "column": column.name,
        "content": content,
        "visible": visible.toZeroOne(),
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}

enum PostColumn {
  activity("活動消息"),
  health("健康焦點"),
  restaurant("餐廳報告"),
  nutrition("營養報報");

  final String label;

  const PostColumn(this.label);
}
