import 'package:flutter/material.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/model/post/post_response.dart';
import 'package:health_care_website/repo/post_repo.dart';

class PostListPageViewModel with ChangeNotifier {
  PostResponse? _postResponse;
  PostColumn? _column;
  int? _page;

  List<Post> get posts => _postResponse?.posts ?? [];
  int get page => _page ?? 1;
  int get totalPage => _postResponse?.totalPage ?? 1;
  PostColumn? get column => _column;

  Future<Post?> createNewPost() async {
    return await PostRepo.createPost();
  }

  Future<void> updatePostList({
    PostColumn? column,
    int? page,
  }) async {
    if (page != null) _page = page;
    if (column != null) _column = column;
    _postResponse = await PostRepo.getPosts(
      column: _column,
      page: _page,
    );
    notifyListeners();
  }

  Future<void> togglePostImportant(Post post) async {
    final newValue = await PostRepo.togglePostImportant(post.id, !post.important);
    post.important = newValue;
    notifyListeners();
  }
}
