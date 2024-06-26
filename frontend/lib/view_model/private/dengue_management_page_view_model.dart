import 'dart:async';
import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/dengue/building.dart';
import 'package:health_care_website/repo/dengue_repo.dart';

class DengueManagementPageViewModel with ChangeNotifier {
  List<Building> _buildings = [];
  List<Building> get buildings => UnmodifiableListView(_buildings);

  Map<String, bool> _filledStatus = {};

  Future<void> fetchFromServer() async {
    _filledStatus = await DengueRepo.getFilledStatus();
    await updateBuildings();
  }

  Future<void> updateBuildings() async {
    _buildings = await DengueRepo.getBuildings();
    notifyListeners();
  }

  Future<void> createBuilding(String name) async {
    await DengueRepo.createBuilding(name);
    await updateBuildings();
    notifyListeners();
  }

  Future<void> deleteBuilding(Building building) async {
    await DengueRepo.deleteBuilding(building.id);
    await updateBuildings();
    notifyListeners();
  }

  Future<void> patchBuildingUser(Building building, String userId) async {
    await DengueRepo.patchBuildingUser(building.id, userId);
    await updateBuildings();
    notifyListeners();
  }

  bool isCompleteFilled(Building building) {
    return _filledStatus[building.id] ?? false;
  }

  Uri getStatsUrl(DateTime begin, DateTime end) {
    return DengueRepo.getStatsUrl(begin, end);
  }
}
