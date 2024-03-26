import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/post_column.dart';
import 'package:health_care_website/model/carousel/caroousel_info.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/repo/carousel_repo.dart';
import 'package:health_care_website/repo/post_repo.dart';
import 'package:health_care_website/repo/restaurant_repo.dart';

class HomePageViewModel with ChangeNotifier {
  PostColumn? _column;
  PostColumn? get column => _column;
  set column(PostColumn? value) {
    _column = value;
    notifyListeners();
  }

  List<Post> _posts = [];
  List<Post> get posts => UnmodifiableListView(_posts);

  List<Restaurant> _restaurant = [];
  List<Restaurant> get restaurantas => UnmodifiableListView(_restaurant);

  List<CarouselInfo> _images = [];
  List<CarouselInfo> get images => UnmodifiableListView(_images);

  Future<void> fetchFromServer() async {
    _posts = (await PostRepo.getPosts(column: _column))!.posts;
    _restaurant = (await RestaurantRepo.getRestaurants())!.restaurants;
    _images = await CarouselRepo.getImages();
    notifyListeners();
  }
}
