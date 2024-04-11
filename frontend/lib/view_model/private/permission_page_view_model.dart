import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/user_role.dart';
import 'package:health_care_website/model/user/user.dart';
import 'package:health_care_website/repo/user_repo.dart';

class PermissionPageViewModel with ChangeNotifier {
  List<User> _users = [];
  List<User> get users => UnmodifiableListView(_users);

  Future<List<User>> fetchFromServer() async{
    _users = await UserRepo.getUsers();
    notifyListeners();
    return users;
  }

  Future<void> updatePermission(User user, UserRole? role) async {
    if (role == null || role == user.role) return;
    await UserRepo.updatePermission(user.id, role);
    fetchFromServer();
  }

  Future<void> deleteUser(User user) async {
    await UserRepo.deleteUser(user.id);
    fetchFromServer();
  }
}