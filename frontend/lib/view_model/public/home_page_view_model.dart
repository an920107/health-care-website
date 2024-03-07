import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/repo/post_repo.dart';

class HomePageViewModel with ChangeNotifier {
  PostColumn? _column;
  PostColumn? get column => _column;
  set column(PostColumn? value) {
    _column = value;
    notifyListeners();
  }

  List<Post> _posts = [];
  List<Post> get posts => UnmodifiableListView(_posts);

  Future<void> getPost() async {
    _posts = (await PostRepo.getPosts(column: _column))!.posts;
    notifyListeners();
  }
}