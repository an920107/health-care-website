import 'dart:collection';
import 'dart:typed_data';

import 'package:flutter/cupertino.dart';
import 'package:health_care_website/model/carousel/caroousel_info.dart';
import 'package:health_care_website/repo/carousel_repo.dart';

class CarouselPageViewModel with ChangeNotifier {
  Future<void> uploadImage(Uint8List file, String filename) async {
    await CarouselRepo.uploadImage(file, filename);
  }

  List<CarouselInfo> _images = [];
  List<CarouselInfo> get images => UnmodifiableListView(_images);

  Future<void> fetchFromServer() async {
    _images = await CarouselRepo.getImages();
    notifyListeners();
  }

  Future<void> deleteImage(CarouselInfo image) async {
    await CarouselRepo.deleteImage(image.id);
  }
}