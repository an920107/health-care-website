class Dengue {
  String id;
  String buildingId;
  DateTime filledTime;
  String jsonData;
  DateTime createTime;
  DateTime updateTime;

  String? buildingName;

  Dengue({
    required this.id,
    required this.buildingId,
    required this.filledTime,
    required this.jsonData,
    required this.createTime,
    required this.updateTime,
  });

  factory Dengue.fromJson(Map<String, dynamic> json) => Dengue(
    id: json["id"],
    buildingId: json["building_id"],
    filledTime: DateTime.parse("${json["create_year_month"] as String}-01"),
    jsonData: json["json_data"],
    createTime: DateTime.parse(json["create_time"]),
    updateTime: DateTime.parse(json["update_time"]),
  );
}
