
import 'dart:collection';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/repo/restaurant_repo.dart';

class RestaurantPageViewModel with ChangeNotifier {
  Restaurant? _restaurant;
  Restaurant? get restaurant => _restaurant;

  String _id = "";
  String get id => _id;

  List<AttachmentInfo> _attachments = [];
  List<AttachmentInfo> get attachments => UnmodifiableListView(_attachments);

  Future<Restaurant?> fetchFromServer(String id) async {
    _id = id;
    _restaurant = await RestaurantRepo.getRestaurant(_id);

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
}