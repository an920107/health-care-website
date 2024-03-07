class User {
  String id;
  String name;

  User({
    required this.id,
    required this.name,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        name: json["name"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
      };
}

enum Permission {
  normal(0),
  editor(1),
  admin(2);

  final int level;

  const Permission(this.level);

  bool operator >(Permission other) => level > other.level;
  bool operator <(Permission other) => level < other.level;
  bool operator >=(Permission other) => level >= other.level;
  bool operator <=(Permission other) => level >= other.level;
}