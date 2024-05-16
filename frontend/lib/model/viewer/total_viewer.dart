class TotalViewer {
  String id;
  int viewer;
  DateTime createTime;
  DateTime updateTime;

  TotalViewer({
    required this.id,
    required this.viewer,
    required this.createTime,
    required this.updateTime,
  });

  factory TotalViewer.fromJson(Map<String, dynamic> json) => TotalViewer(
        id: json["id"],
        viewer: int.parse(json["viewer"]),
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );
}
