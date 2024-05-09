import 'package:flutter/material.dart';
import 'package:health_care_website/model/dengue/dengue.dart';
import 'package:health_care_website/repo/dengue_repo.dart';

class DengueListPageViewModel with ChangeNotifier {
  List<Dengue> dengues = [];

  Future<void> fetchFromServer() async {
    dengues = await DengueRepo.getDengues();
    for (var dengue in dengues) {
      dengue.buildingName = (await DengueRepo.getBuilding(dengue.buildingId))?.name;
    }
    notifyListeners();
  }

  Future<void> deleteDengue(Dengue dengue) async {
    await DengueRepo.deleteDengue(dengue.id);
    await fetchFromServer();
  }

  Uri getStatsUrl(Dengue dengue) {
    return DengueRepo.getStatsUrlById(dengue.id);
  }
}
