import 'package:flutter/material.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/model/restaurant/restaurant_response.dart';
import 'package:health_care_website/repo/restaurant_repo.dart';

class RestaurantListPageViewModel with ChangeNotifier {
  RestaurantResponse? _restaurantResponse;

  List<Restaurant> get restaurants => _restaurantResponse?.restaurants ?? [];
  
  int _page = 1;
  int get page => _page;
  int get totalPage => _restaurantResponse?.totalPage ?? 1;

  Future<void> restaurantAdjustPageNumber(int increment) async {
    if (_page + increment > totalPage) {
      if (_page == totalPage) return;
      _page = totalPage;
    } else if (_page + increment < 1) {
      if (_page == 1) return;
      _page = 1;
    } else {
      _page += increment;
    }
    _restaurantResponse = await RestaurantRepo.getRestaurants(
      page: _page,
    );
    notifyListeners();
  }

  Future<Restaurant?> createNewRestaurant() async {
    return await RestaurantRepo.createRestaurant();
  }

  Future<void> updateRestaurantList({
    int? page,
  }) async {
    if (page != null) _page = page;
    _restaurantResponse = await RestaurantRepo.getRestaurants(
      page: _page,
    );
    notifyListeners();
  }

  Uri getStatsUrl(DateTime start, DateTime end) {
    return RestaurantRepo.getStatsUrl(start, end);
  }
}
