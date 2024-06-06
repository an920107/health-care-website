import 'package:health_care_website/enum/post_column.dart';
import 'package:health_care_website/extension/boolean_extension.dart';

class Post {
  String id;
  String title;
  PostColumn column;
  String content;
  String attachments;
  int viewer;
  bool visible;
  bool importance;
  DateTime createTime;
  DateTime updateTime;

  Post({
    required this.id,
    required this.title,
    required this.column,
    required this.content,
    required this.attachments,
    required this.viewer,
    required this.visible,
    required this.importance,
    required this.createTime,
    required this.updateTime,
  });

  factory Post.fromJson(Map<String, dynamic> json) => Post(
        id: json["id"],
        title: json["title"],
        column: PostColumn.values.where((e) => e.name == json["column"]).first,
        content: json["content"] ?? "",
        attachments: json["attachments"] ?? "",
        viewer: int.parse(json["viewer"]),
        visible: json["visible"] == "1",
        importance: json["importance"] == "1",
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "column": column.name,
        "content": content,
        "attachments": attachments,
        "viewer": viewer.toString(),
        "visible": visible.toZeroOne().toString(),
        "importance": importance.toZeroOne().toString(),
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
