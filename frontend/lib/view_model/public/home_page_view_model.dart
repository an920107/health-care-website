import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/post_column.dart';
import 'package:health_care_website/model/carousel/carousel_info.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/model/post/post_response.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/model/restaurant/restaurant_response.dart';
import 'package:health_care_website/repo/carousel_repo.dart';
import 'package:health_care_website/repo/post_repo.dart';
import 'package:health_care_website/repo/restaurant_repo.dart';

class HomePageViewModel with ChangeNotifier {
  PostColumn? _column;
  PostColumn? get column => _column;
  set column(PostColumn? value) {
    _column = value;
    PostRepo.getPosts(column: _column).then((value) {
      _postCurrentPage = 1;
      _postResponse = value;
      notifyListeners();
    });
  }

  PostResponse? _postResponse;
  List<Post> get posts => UnmodifiableListView(_postResponse?.posts ?? []);

  int get postTotalPage => _postResponse?.totalPage ?? 1;
  int _postCurrentPage = 1;
  int get postCurrentPage => _postCurrentPage;
  Future<void> postAdjustPageNumber(int increment) async {
    if (_postCurrentPage + increment > postTotalPage) {
      if (_postCurrentPage == postTotalPage) return;
      _postCurrentPage = postTotalPage;
    } else if (_postCurrentPage + increment < 1) {
      if (_postCurrentPage == 1) return;
      _postCurrentPage = 1;
    } else {
      _postCurrentPage += increment;
    }
    _postResponse = await PostRepo.getPosts(
      column: _column,
      page: _postCurrentPage,
    );
    notifyListeners();
  }

  RestaurantResponse? _restaurantResponse;
  List<Restaurant> get restaurantas =>
      UnmodifiableListView(_restaurantResponse?.restaurants ?? []);

  int get restaurantTotalPage => _restaurantResponse?.totalPage ?? 1;
  int _restaurantCurrentPage = 1;
  int get restaurantCurrentPage => _restaurantCurrentPage;
  Future<void> restaurantAdjustPageNumber(int increment) async {
    if (_restaurantCurrentPage + increment > restaurantTotalPage) {
      if (_restaurantCurrentPage == restaurantTotalPage) return;
      _restaurantCurrentPage = restaurantTotalPage;
    } else if (_restaurantCurrentPage + increment < 1) {
      if (_restaurantCurrentPage == 1) return;
      _restaurantCurrentPage = 1;
    } else {
      _restaurantCurrentPage += increment;
    }
    _restaurantResponse = await RestaurantRepo.getRestaurants(
      page: _restaurantCurrentPage,
    );
    notifyListeners();
  }

  List<CarouselInfo> _images = [];
  List<CarouselInfo> get images => UnmodifiableListView(_images);

  Map<String, Post?> _carouselPosts = {};
  Map<String, Post?> get carouselPosts => UnmodifiableMapView(_carouselPosts);

  Future<void> fetchFromServer() async {
    _postCurrentPage = 1;
    _restaurantCurrentPage = 1;
    _postResponse = await PostRepo.getPosts(column: _column);
    _restaurantResponse = await RestaurantRepo.getRestaurants();
    _images = await CarouselRepo.getImages();
    _carouselPosts = {};
    for (var image in _images) {
      _carouselPosts[image.postId] = await PostRepo.getPost(image.postId);
    }
    notifyListeners();
  }
}
