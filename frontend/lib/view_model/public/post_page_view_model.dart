
import 'dart:collection';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/post/attachment_info.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/repo/post_repo.dart';

class PostPageViewModel with ChangeNotifier {
  Post? _post;
  Post? get post => _post;

  String _id = "";
  String get id => _id;

  List<AttachmentInfo> _attachments = [];
  List<AttachmentInfo> get attachments => UnmodifiableListView(_attachments);

  Future<Post?> fetchFromServer(String id) async {
    _id = id;
    _post = await PostRepo.getPost(_id);

    // 附件傳輸
    final attachmentIds = json.decode(_post!.attachments) as List;
    final attachmentSet = <String, AttachmentInfo>{};
    await Future.wait(
      attachmentIds.map(
        (e) => PostRepo.getAttachmentInfo(e)
            .then((value) => attachmentSet[e.toString()] = value!),
      ),
    );
    _attachments = [];
    for (var str in attachmentIds) {
      _attachments.add(attachmentSet[str]!);
    }
    
    notifyListeners();
    return _post;
  }
}