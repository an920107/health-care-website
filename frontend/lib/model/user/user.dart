import 'package:health_care_website/enum/user_role.dart';

class User {
  String id;
  String name;
  UserRole role;
  DateTime createTime;
  DateTime updateTime;

  User({
    required this.id,
    required this.name,
    required this.role,
    required this.createTime,
    required this.updateTime,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        name: json["chinese_name"],
        role: UserRole.values
            .firstWhere((e) => e.code.toString() == json["authorization"]),
        createTime: DateTime.parse(json["create_time"]),
        updateTime: DateTime.parse(json["update_time"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "chinese_name": name,
        "authorization": role.code.toString(),
        "create_time": createTime.toIso8601String(),
        "update_time": updateTime.toIso8601String(),
      };
}
