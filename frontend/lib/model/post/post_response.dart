import 'package:health_care_website/model/post/post.dart';

class PostResponse {
  List<Post> posts;
  int page;
  int totalPage;

  PostResponse({
    required this.posts,
    required this.page,
    required this.totalPage,
  });

  factory PostResponse.fromJson(Map<String, dynamic> json) => PostResponse(
        posts: (json["posts"] as List).map((e) => Post.fromJson(e)).toList(),
        page: int.parse(json["pages"]),
        totalPage: int.parse(json["total_page"]),
      );
}
