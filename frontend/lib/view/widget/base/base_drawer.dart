import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:health_care_website/view/widget/icon_text.dart';

class BaseDrawer extends StatefulWidget {
  const BaseDrawer({super.key});

  @override
  State<BaseDrawer> createState() => _BaseDrawerState();
}

class _BaseDrawerState extends State<BaseDrawer> {
  final _routes = [
    "新生健檢報告",
    "教職員體格檢查",
    "身體組成分析儀",
    "手指消毒器 SDS\n安全資料表",
    "登革熱防疫專區",
    "母性健康保護",
    "紅火蟻防治",
    "學生團體保險",
    "醫療及防疫器材",
    "醫療新知",
    "特約醫院",
    "我的健康餐盤",
    "餐飲衛生",
    "相關網站",
    "關於我們",
    "聯絡我們",
    "檔案下載",
    ""
  ];

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
          child: ListView.separated(
        itemBuilder: (context, index) {
          if (index == 0) {
            return const Padding(
              padding: EdgeInsets.only(
                top: 50,
                bottom: 25,
              ),
              child: IconText(
                icon: Icon(FontAwesomeIcons.solidCompass),
                child: Text(
                  "MENU",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            );
          } else {
            return ListTile(
              title: Text(_routes[index - 1]),
            );
          }
        },
        separatorBuilder: (_, __) => const Divider(),
        itemCount: _routes.length + 1,
      )),
    );
  }
}
