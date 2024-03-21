import 'package:health_care_website/config.dart';

class AttachmentInfo {
  String id;
  String name;
  String uri;
  DateTime createTime;
  DateTime updateTime;

  AttachmentInfo({
    required this.id,
    required this.name,
    required this.uri,
    required this.createTime,
    required this.updateTime,
  });

  factory AttachmentInfo.fromJson(Map<String, dynamic> json) => AttachmentInfo(
        id: json["id"],
        name: json["name"],
        uri: json["attachment_uri"],
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "attachment_uri": uri,
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };

  Uri get url => Uri.https(Config.backend, uri);
}
