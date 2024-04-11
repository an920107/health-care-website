import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/post_column.dart';
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

  final List<Post> _importanceLock = [];
  List<Post> get importanceLock => UnmodifiableListView(_importanceLock);

  Future<void> togglePostImportant(Post post) async {
    _importanceLock.add(post);
    post.importance = !post.importance;
    notifyListeners();
    final newValue = await PostRepo.togglePostImportance(post.id, !post.importance);
    post.importance = newValue;
    _importanceLock.removeWhere((e) => e == post);
    notifyListeners();
  }
}
