import 'package:health_care_website/model/restaurant/restaurant.dart';

class RestaurantResponse {
  List<Restaurant> restaurants;
  int page;
  int totalPage;

  RestaurantResponse({
    required this.restaurants,
    required this.page,
    required this.totalPage,
  });

  factory RestaurantResponse.fromJson(Map<String, dynamic> json) => RestaurantResponse(
        restaurants: (json["posts"] as List).map((e) => Restaurant.fromJson(e)).toList(),
        page: int.parse(json["page"]),
        totalPage: int.parse(json["total_page"]),
      );
}
