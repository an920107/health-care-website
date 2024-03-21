
import 'dart:collection';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/static_page/static_page.dart';
import 'package:health_care_website/repo/static_page_repo.dart';

class StaticPagePageViewModel with ChangeNotifier {
  StaticPage? _page;
  StaticPage? get page => _page;



  late PageTopic _topic;
  PageTopic get topic => _topic;

  List<AttachmentInfo> _attachments = [];
  List<AttachmentInfo> get attachments => UnmodifiableListView(_attachments);

  Future<StaticPage?> fetchFromServer(String id) async {
    _topic = PageTopic.values.where((e) => e.id == id).first;
    _page = await StaticPageRepo.getPage(_topic);

    // 附件傳輸
    final attachmentIds = json.decode(_page!.attachments) as List;
    final attachmentSet = <String, AttachmentInfo>{};
    await Future.wait(
      attachmentIds.map(
        (e) => StaticPageRepo.getAttachmentInfo(e)
            .then((value) => attachmentSet[e.toString()] = value!),
      ),
    );
    _attachments = [];
    for (var str in attachmentIds) {
      _attachments.add(attachmentSet[str]!);
    }
    
    notifyListeners();
    return _page;
  }
}
