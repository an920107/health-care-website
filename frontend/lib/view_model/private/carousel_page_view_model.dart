import 'dart:collection';
import 'dart:typed_data';

import 'package:flutter/cupertino.dart';
import 'package:health_care_website/model/carousel/carousel_info.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/repo/carousel_repo.dart';
import 'package:health_care_website/repo/post_repo.dart';

class CarouselPageViewModel with ChangeNotifier {
  Future<Post?> createCarousel(Uint8List file, String filename) async {
    Post? post = await PostRepo.createPost();
    if (post == null) return null;
    await CarouselRepo.uploadImage(file, filename, post.id);
    return post;
  }

  List<CarouselInfo> _images = [];
  List<CarouselInfo> get images => UnmodifiableListView(_images);

  Map<String, Post?> _carouselPosts = {};
  Map<String, Post?> get carouselPosts => UnmodifiableMapView(_carouselPosts);

  Future<void> fetchFromServer() async {
    _images = await CarouselRepo.getImages();
    _carouselPosts = {};
    for (var image in _images) {
      _carouselPosts[image.postId] = await PostRepo.getPost(image.postId);
    }
    notifyListeners();
  }

  Future<void> deleteImage(CarouselInfo image) async {
    await CarouselRepo.deleteImage(image.id);
    await PostRepo.delete(image.postId);
  }
}
