import 'package:health_care_website/enum/page_group.dart';

enum PageTopic {
  workteam("工作團隊", PageGroup.about),
  serviceTime("服務時間", PageGroup.about),
  transportation("交通地圖", PageGroup.about),
  freshmenCheckUp("新生健康檢查", PageGroup.checkUp),
  physiqueCheck("新進人員體格檢查", PageGroup.checkUp),
  specialCheck("定期健康檢查", PageGroup.checkUp),
  emergencyHotline("緊急通報專線", PageGroup.emergency),
  injuryProcess("校園傷病處理", PageGroup.emergency),
  aed("校園 AED", PageGroup.emergency),
  insurance("學生團體保險", PageGroup.service),
  equipment("醫療器材借用", PageGroup.service),
  facility("健康管理設施", PageGroup.service),
  onCampusService("職業醫師臨校服務", PageGroup.workplace),
  workplaceServicePlan("職場健康服務計畫", PageGroup.workplace),
  cpr("大一 CPR", PageGroup.train),
  tabaccoPrevention("校園菸害防制教育", PageGroup.train),
  aidsPrevention("校園愛滋防治教育", PageGroup.train),
  diseasePrevension("校園傳染病防治", PageGroup.train);

  final String label;
  final PageGroup group;

  const PageTopic(this.label, this.group);

  static Map<PageGroup, List<PageTopic>> asMap() {
    final map = <PageGroup, List<PageTopic>>{};
    for (var topic in PageTopic.values) {
      if (map[topic.group] == null) {
        map[topic.group] = [];
      }
      map[topic.group]!.add(topic);
    }
    return map;
  }
}
