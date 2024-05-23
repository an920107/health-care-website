import 'package:health_care_website/enum/restaurant_inspection_item.dart';
import 'package:health_care_website/extension/boolean_extension.dart';

class Restaurant {
  String id;
  String title;
  // String author;
  RestaurantInspectionCategory category;
  String item;
  String attachments;
  int viewer;
  bool visible;
  bool valid;
  DateTime inspectTime;
  DateTime createTime;
  DateTime updateTime;

  Restaurant({
    required this.id,
    required this.title,
    required this.category,
    required this.item,
    required this.attachments,
    required this.viewer,
    required this.visible,
    required this.valid,
    required this.inspectTime,
    required this.createTime,
    required this.updateTime,
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) => Restaurant(
        id: json["id"],
        title: json["title"],
        category: RestaurantInspectionCategory.values.where((e) => e.name == json["category"]).first,
        item: json["item"],
        attachments: json["attachments"] ?? "",
        viewer: int.parse(json["viewer"]),
        visible: json["visible"] == "1",
        valid: json["valid"] == "1",
        inspectTime: DateTime.parse(json["time"]),
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "category": category.name,
        "item": item,
        "attachments": attachments,
        "viewer": viewer.toString(),
        "visible": visible.toZeroOne().toString(),
        "valid": valid.toZeroOne().toString(),
        "time": inspectTime.toIso8601String(),
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
