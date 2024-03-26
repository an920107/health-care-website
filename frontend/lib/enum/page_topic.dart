import 'package:health_care_website/enum/page_group.dart';

enum PageTopic {
  workteam("work_team", "工作團隊", PageGroup.about),
  serviceTime("service_hours", "服務時間", PageGroup.about),
  transportation("traffic_map", "交通地圖", PageGroup.about),
  freshmenCheckUp("freshmanHealth_check", "新生健康檢查", PageGroup.checkUp),
  physiqueCheck("new_employee_physical_exam", "新進人員體格檢查", PageGroup.checkUp),
  specialCheck("regular_health_check", "定期健康檢查", PageGroup.checkUp),
  emergencyHotline("emergency_hotline", "緊急通報專線", PageGroup.emergency),
  injuryProcess("campus_injury_treatment", "校園傷病處理", PageGroup.emergency),
  aed("campus_aed", "校園 AED", PageGroup.emergency),
  insurance("student_group_insurance", "學生團體保險", PageGroup.service),
  equipment("medical_equipment_loan", "醫療器材借用", PageGroup.service),
  facility("health_management_facilities", "健康管理設施", PageGroup.service),
  onCampusService("on_site_occupational_health_service", "職業醫師臨校服務", PageGroup.workplace),
  workplaceServicePlan("workplace_health_service_plan", "職場健康服務計畫", PageGroup.workplace),
  cpr("freshman_cpr", "大一 CPR", PageGroup.train),
  tabaccoPrevention("campus_tobacco_control_education", "校園菸害防制教育", PageGroup.train),
  aidsPrevention("campus_aids_prevention_education", "校園愛滋防治教育", PageGroup.train),
  diseasePrevension("campus_infectious_disease_prevention", "校園傳染病防治", PageGroup.train);

  final String id;
  final String label;
  final PageGroup group;

  const PageTopic(this.id, this.label, this.group);

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
