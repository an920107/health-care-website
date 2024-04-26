class Building {
  String id;
  String name;
  String userId;
  DateTime createTime;
  DateTime updateTime;

  Building({
    required this.id,
    required this.name,
    required this.userId,
    required this.createTime,
    required this.updateTime,
  });

  factory Building.fromJson(Map<String, dynamic> json) => Building(
        id: json["id"],
        name: json["chinese_name"],
        userId: json["user_id"],
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "chinese_name": name,
        "user_id": userId,
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
