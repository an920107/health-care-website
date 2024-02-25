import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/post.dart';
import 'package:health_care_website/repo/post_repo.dart';

class PostEditorPageViewModel with ChangeNotifier {
  Post? _post;
  Post? get post => _post;

  String _id = "";
  String get id => _id;
  set id(String value) {
    _id = value;
    _post = null;
    if (_id.isEmpty) {
    } else {
      PostRepo.getPost(_id)
        ..onError((error, stackTrace) => null)
        ..then((value) {
          _post = value;
          notifyListeners();
        });
    }
    notifyListeners();
  }

  Future<Post?> fetchFromServer(String id) async {
    _id = id;
    _post = await PostRepo.getPost(_id);
    return _post;
  }

  Future<void> uploadPost({
    required String title,
    required PostColumn column,
    required String content,
    required bool visible,
  }) async {
    if (_post == null) return;
    _post!
      ..title = title
      ..column = column
      ..content = content
      ..visible = visible;
    await PostRepo.updatePost(_post!);
  }

  Future<String> uploadAttachment(Uint8List file, filename) async {
    return await PostRepo.uploadAttachment(file, filename);
  }

  Future<void> delete() async {
    await PostRepo.delete(_id);
  }
}
