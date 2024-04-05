enum UserRole {
  normal(-1),
  student(2),
  teacher(1),
  admin(0);

  final int code;

  const UserRole(this.code);

  bool operator >(UserRole other) => code > other.code;
  bool operator <(UserRole other) => code < other.code;
  bool operator >=(UserRole other) => code >= other.code;
  bool operator <=(UserRole other) => code >= other.code;
}
