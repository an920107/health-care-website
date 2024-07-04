import 'dart:collection';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:health_care_website/enum/restaurant_inspection_item.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/repo/restaurant_repo.dart';
import 'package:health_care_website/view_model/mixin/title_validator.dart';

class RestaurantEditPageViewModel with ChangeNotifier, TitleValidator {
  Restaurant? _restaurant;
  Restaurant? get restaurant => _restaurant;

  String _id = "";
  String get id => _id;

  List<AttachmentInfo> _attachments = [];
  List<AttachmentInfo> get attachments => UnmodifiableListView(_attachments);

  bool _visible = false;
  bool get visible => _visible;
  set visible(bool value) {
    _visible = value;
    notifyListeners();
  }

  bool _passedInspection = false;
  bool get passedInspection => _passedInspection;
  set passedInspection(bool value) {
    _passedInspection = value;
    notifyListeners();
  }

  RestaurantInspectionCategory _selectedRestaurantColumn =
      RestaurantInspectionCategory.values.first;
  RestaurantInspectionCategory get selectedRestaurantColumn =>
      _selectedRestaurantColumn;
  set selectedRestaurantColumn(RestaurantInspectionCategory value) {
    _selectedRestaurantColumn = value;
    notifyListeners();
  }

  Future<Restaurant?> fetchFromServer(String id) async {
    // TODO: 顯示錯誤原因
    _id = id;
    _restaurant = await RestaurantRepo.getRestaurant(_id);
    _visible = _restaurant!.visible;
    _selectedRestaurantColumn = _restaurant!.category;
    _passedInspection = _restaurant!.valid;

    // 附件傳輸
    final attachmentIds = json.decode(_restaurant!.attachments) as List;
    final attachmentSet = <String, AttachmentInfo>{};
    await Future.wait(
      attachmentIds.map(
        (e) => RestaurantRepo.getAttachmentInfo(e)
            .then((value) => attachmentSet[e.toString()] = value!),
      ),
    );
    _attachments = [];
    for (var str in attachmentIds) {
      _attachments.add(attachmentSet[str]!);
    }

    notifyListeners();
    return _restaurant;
  }

  Future<void> uploadRestaurant({
    required String title,
    required String item,
    required DateTime inspectTime,
  }) async {
    if (_restaurant == null) return;
    _restaurant!
      ..title = title
      ..valid = _passedInspection
      ..category = _selectedRestaurantColumn
      ..item = item
      ..inspectTime = inspectTime
      ..attachments = json.encode(_attachments.map((e) => e.id).toList())
      ..visible = _visible;
    await RestaurantRepo.updateRestaurant(_restaurant!);
  }

  Future<void> uploadAttachment(Uint8List file, String filename) async {
    // TODO: 顯示錯誤原因
    final response = await RestaurantRepo.uploadAttachment(_id, file, filename);
    _attachments.add((await RestaurantRepo.getAttachmentInfo(response!.id))!);
    notifyListeners();
  }

  Future<void> removeAttachment(String id) async {
    // await RestaurantRepo.deleteAttachment(id);
    _attachments.removeWhere((e) => e.id == id);
    notifyListeners();
  }

  Future<void> delete() async {
    await RestaurantRepo.delete(_id);
  }
}
