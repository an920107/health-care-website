import 'dart:async';
import 'dart:collection';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/static_page/static_page.dart';
import 'package:health_care_website/repo/static_page_repo.dart';

class StaticPageEditPageViewModel with ChangeNotifier {
  StaticPage? _page;
  StaticPage? get page => _page;

  List<AttachmentInfo> _attachments = [];
  List<AttachmentInfo> get attachments => UnmodifiableListView(_attachments);

  bool _visible = false;
  bool get visible => _visible;
  set visible(bool value) {
    _visible = value;
    notifyListeners();
  }

  PageTopic _selectedPageTopic = PageTopic.values.first;
  PageTopic get selectedPageTopic => _selectedPageTopic;
  set selectedPageTopic(PageTopic value) {
    _selectedPageTopic = value;
    notifyListeners();
    fetchFromServer();
  }

  Future<StaticPage?> fetchFromServer([PageTopic? topic]) async {

    // TODO: 顯示錯誤原因
    if (topic != null) _selectedPageTopic = topic;
    _page = (await StaticPageRepo.getPage(_selectedPageTopic));

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

  Future<void> uploadPage(String content) async {
    if (_page == null) return;
    _page!
      ..content = content
      ..attachments = json.encode(_attachments.map((e) => e.id).toList());
    await StaticPageRepo.updatePage(_selectedPageTopic, _page!);
  }

  Future<String> uploadImage(Uint8List file, String filename) async {
    // TODO: 顯示錯誤原因
    final response =
        await StaticPageRepo.uploadImage(_selectedPageTopic, file, filename);
    var url = Uri.https(Config.backend, response!.uri).toString();
    return url;
  }

  Future<void> uploadAttachment(Uint8List file, String filename) async {
    // TODO: 顯示錯誤原因
    final response = await StaticPageRepo.uploadAttachment(
        _selectedPageTopic, file, filename);
    _attachments.add((await StaticPageRepo.getAttachmentInfo(response!.id))!);
    notifyListeners();
  }

  Future<void> removeAttachment(String id) async {
    _attachments.removeWhere((e) => e.id == id);
    notifyListeners();
  }
}
