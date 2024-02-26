class AttachmentInfo {
  String id;
  String name;
  DateTime createTime;
  DateTime updateTime;

  AttachmentInfo({
    required this.id,
    required this.name,
    required this.createTime,
    required this.updateTime,
  });

  factory AttachmentInfo.fromJson(Map<String, dynamic> json) => AttachmentInfo(
        id: json["id"],
        name: json["name"],
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
