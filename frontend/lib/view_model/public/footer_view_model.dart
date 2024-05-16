
import 'package:flutter/material.dart';
import 'package:health_care_website/repo/total_viewer_repo.dart';

class FooterViewModel with ChangeNotifier {
  int _totalViewer = 0;
  int get totalViewer => _totalViewer;

  Future<void> fetchFromServer() async {
    _totalViewer = (await TotalViewerRepo.getTotalViewer())?.viewer ?? 0;
    notifyListeners();
  }
}