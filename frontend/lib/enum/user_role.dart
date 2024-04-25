enum UserRole {
  none(100000),
  normal(9),
  studentB(2),
  studentA(1),
  admin(0);

  final int code;

  const UserRole(this.code);

  bool operator >(UserRole other) => code < other.code;
  bool operator <(UserRole other) => code > other.code;
  bool operator >=(UserRole other) => code <= other.code;
  bool operator <=(UserRole other) => code >= other.code;
}
