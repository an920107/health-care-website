import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/dengue/building.dart';
import 'package:health_care_website/repo/dengue_repo.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';

class DengueFormPageViewModel with ChangeNotifier {
  final _questions = <DengueFormQuestion>[
    DengueFormQuestion(
      title: "空瓶、空罐",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "陶甕、水缸",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "杯子、碟子、盤子、碗",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "鍋、壺",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "保麗龍製品或塑膠製品、免洗餐具",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "桶子（木桶、鐵桶、塑膠桶等）",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "椰子殼",
      subQuestion: DengueFormQuestion(
        title: "這些是否已清除（若未清除請馬上動手清除）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "廢輪胎、廢安全帽",
      subQuestion: DengueFormQuestion(
        title: "請移除或以土填滿並種小花等植物。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "屋簷旁排水管、帆布、遮雨棚",
      subQuestion: DengueFormQuestion(
        title: "裡面是否阻塞積水（若有請立即疏通）。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "廢棄冰箱、洗衣機、馬桶或水族箱",
      subQuestion: DengueFormQuestion(
        title: "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "不使用或未加蓋的水塔（蓄水塔）",
      subQuestion: DengueFormQuestion(
        title: "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "未使用中的冷氣、冷卻水塔、冷飲櫃",
      subQuestion: DengueFormQuestion(
        title: "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "大型儲水桶有無加蓋或蓋細紗網",
      subQuestion: DengueFormQuestion(
        title: "儲水容器請記得加蓋或蓋細紗網，不用時倒置。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "寵物水盤、雞、鴨、家禽、鳥籠或鴿舍內飲水槽、馬槽水",
      subQuestion: DengueFormQuestion(
        title: "是否一週換水一次並刷洗乾淨？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "積水地下室",
      subQuestion: DengueFormQuestion(
        title: "水是否已清除？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "地下室內的集水井",
      subQuestion: DengueFormQuestion(
        title: "是否有孑孓孳生？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "自來水表或瓦斯表",
      subQuestion: DengueFormQuestion(
        title: "內部是否漏水或積水？是否倒置保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "門外信箱",
      subQuestion: DengueFormQuestion(
        title: "內部是否漏水或積水？是否倒置保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "燒金紙的桶子",
      subQuestion: DengueFormQuestion(
        title: "內部是否漏水或積水？是否倒置保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "雨鞋、雨衣",
      subQuestion: DengueFormQuestion(
        title: "內部是否漏水或積水？是否倒置保持乾燥？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "天然積水容器（竹籬笆竹節頂端、竹筒、樹幹上的樹洞、大型樹葉）",
      subQuestion: DengueFormQuestion(
        title: "是否以土填滿並種小花等植物？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "旗座水泥樁上及其他可積水之水管",
      subQuestion: DengueFormQuestion(
        title: "把水倒掉，若暫不使用則封住開口。",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "假山造型水池（凹槽處）、冷氣機滴水",
      subQuestion: DengueFormQuestion(
        title: "是否有孑孓孳生？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "水溝積水有孑孓孳生",
      subQuestion: DengueFormQuestion(
        title: "裡面是否阻塞？（若有請立即疏通）",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "其他（任何容器或雜物）",
      type: DengueFormQuestionType.open,
    ),
    DengueFormQuestion(
      title: "花盤、花瓶、插水生植物容器（如：萬年青、黃金葛等）",
      subQuestion: DengueFormQuestion(
        title: "是否一週換水一次，並洗刷乾淨？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "澆花灑水桶、花盆盆栽底盤",
      subQuestion: DengueFormQuestion(
        title: "是否洗刷乾淨？不用時是否倒置？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "貯水容器（水缸、水泥槽、水桶、陶甕等或盛裝寵物飲水容器）",
      subQuestion: DengueFormQuestion(
        title: "一週換水一次，並洗刷乾淨？貯水容器是否有加蓋密封？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "冰箱底盤、烘碗機底盤、開飲機底盤、泡茶用水盤",
      subQuestion: DengueFormQuestion(
        title: "是否一週換水一次，並洗刷乾淨？",
        type: DengueFormQuestionType.yesOrNo,
      ),
    ),
    DengueFormQuestion(
      title: "其他",
      type: DengueFormQuestionType.open,
    ),
  ];

  List<DengueFormQuestion> get questions => UnmodifiableListView(_questions);

  String? _selectedBuildingId;
  String? get selectedBuildingId => _selectedBuildingId;
  set selectedBuildingId(String? value) {
    _selectedBuildingId = value;
    notifyListeners();
  }

  List<Building> _buildings = [];
  List<Building> get buildings => UnmodifiableListView(_buildings);

  AuthViewModel _authViewModel;

  DengueFormPageViewModel(this._authViewModel);

  void proxyUpdate(AuthViewModel authViewModel) {
    _authViewModel = authViewModel;
  }

  Future<void> fetchFromServer() async {
    _buildings = await DengueRepo.getBuildings(_authViewModel.id);
    notifyListeners();
  }

  void toggleButtonsPressed(int questionIndex, int layer, int buttonIndex) {
    var question = _questions[questionIndex];
    while (layer > 0) {
      question = question.subQuestion!;
      layer--;
    }
    for (int i = 0; i < question.selected.length; i++) {
      question.selected[i] = i == buttonIndex;
    }
    notifyListeners();
  }

  void formTextSubmitted(int questionIndex, int layer, String text) {
    var question = _questions[questionIndex];
    while (layer > 0) {
      question = question.subQuestion!;
      layer--;
    }
    question.text = text;
    notifyListeners();
  }

  final Set<int> _questionsNotFilled = {};
  Set<int> get questionsNotFilled => UnmodifiableSetView(_questionsNotFilled);

  /// It returns a set of indexes of questions that are not filled.
  Set<int> checkQuestionsFilled() {
    _questionsNotFilled.clear();
    for (int i = 0; i < _questions.length; i++) {
      if (_questions[i].type == DengueFormQuestionType.open) {
        // ignore
      } else if (!_questions[i].selected[0] && !_questions[i].selected[1]) {
        _questionsNotFilled.add(i);
      } else if (_questions[i].selected[0] &&
          _questions[i].subQuestion != null) {
        final subQuestion = _questions[i].subQuestion!;
        if (!subQuestion.selected[0] && !subQuestion.selected[1]) {
          _questionsNotFilled.add(i);
        }
      }
    }
    notifyListeners();
    return UnmodifiableSetView(_questionsNotFilled);
  }

  /// Returns:
  ///
  /// ```json
  /// {
  ///   "1_question": "bool | string",
  ///   "sub_1_question": "bool | string"
  /// }
  /// ```
  MapEntry<String, dynamic> _jsonfy(
    int index,
    int layer,
    String title,
    List<bool> selected,
    String? text,
    DengueFormQuestionType type,
  ) {
    final result =
        type == DengueFormQuestionType.open ? (text ?? "") : selected[0];
    return MapEntry("${"sub_" * layer}${index.toString()}_$title", result);
  }

  Future<void> upload(DateTime inspectDate) async {
    // TODO: 錯誤處理
    if (_selectedBuildingId == null) throw Exception();

    Map<String, dynamic> form = {};
    for (int i = 0; i < _questions.length; i++) {
      form.addEntries([
        _jsonfy(i, 0, _questions[i].title, _questions[i].selected,
            _questions[i].text, _questions[i].type),
      ]);
      if (_questions[i].subQuestion != null) {
        form.addEntries([
          _jsonfy(
            i,
            1,
            _questions[i].subQuestion!.title,
            _questions[i].subQuestion!.selected,
            _questions[i].subQuestion?.text,
            _questions[i].subQuestion!.type,
          ),
        ]);
      }
    }
    await DengueRepo.uploadForm(
      _selectedBuildingId!,
      inspectDate,
      form,
    );
  }
}

class DengueFormQuestion {
  final String title;
  final DengueFormQuestionType type;
  final List<bool> selected = [false, false];
  final DengueFormQuestion? subQuestion;
  String? text;

  DengueFormQuestion({
    required this.title,
    this.type = DengueFormQuestionType.hasOrNot,
    this.subQuestion,
  });
}

enum DengueFormQuestionType {
  yesOrNo("是", "否"),
  hasOrNot("有", "無"),
  open("", "");

  final String trueLabel;
  final String falseLabel;
  const DengueFormQuestionType(this.trueLabel, this.falseLabel);
}
