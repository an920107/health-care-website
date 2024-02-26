import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:health_care_website/model/post.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
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
  ];

  PostColumn? _selectedPostColumn;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constrain) => BaseScaffold(
        body: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 側邊引導欄
            Expanded(
              flex: 5,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(FontAwesomeIcons.compass),
                          SizedBox(width: 8),
                          Padding(
                            padding: EdgeInsets.all(5),
                            child: Text(
                              "MENU",
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const Divider(
                        thickness: 3,
                        height: 20,
                      ),
                      for (var str in _routes)
                        Column(
                          children: [
                            TextButton(
                              onPressed: () {},
                              child: Text(str, textAlign: TextAlign.center),
                            ),
                            if (str != _routes.last)
                              const Divider(
                                height: 20,
                                indent: 20,
                                endIndent: 20,
                              ),
                          ],
                        ),
                    ],
                  ),
                ),
              ),
            ),
            const Spacer(flex: 1),
            Expanded(
              flex: 20,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  LayoutBuilder(builder: (context, constrain) {
                    return SizedBox(
                      width: constrain.maxWidth,
                      child: CarouselSlider(
                        options: CarouselOptions(
                          autoPlay: true,
                          enlargeCenterPage: true,
                        ),
                        items: List.generate(
                          5,
                          (index) => ClipRRect(
                            borderRadius: BorderRadius.circular(20),
                            child: Image.asset(
                              // TODO: getting image from the server.
                              "assets/carousel/$index.jpg",
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    );
                  }),

                  /**
                   * 以下為假資料
                   */

                  // 公告
                  const SizedBox(height: 20),
                  const Text(
                    "NEWS",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Divider(thickness: 3),
                  const SizedBox(height: 10),
                  SegmentedButton<PostColumn?>(
                    style: SegmentedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.all(12),
                    ),
                    segments: [
                      const ButtonSegment<PostColumn?>(
                        value: null,
                        label: Text("所有公告"),
                      ),
                      ...PostColumn.values.map(
                        (e) => ButtonSegment<PostColumn?>(
                          value: e,
                          label: Text(e.label),
                        ),
                      )
                    ],
                    selectedIcon: const Icon(Icons.view_agenda),
                    onSelectionChanged: (selected) =>
                        setState(() => _selectedPostColumn = selected.first),
                    selected: {_selectedPostColumn},
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: Card(
                          child: DataTable(
                            headingTextStyle:
                                const TextStyle(fontWeight: FontWeight.bold),
                            columns: const [
                              DataColumn(label: Text("訊息類別")),
                              DataColumn(label: Text("主題")),
                              DataColumn(label: Text("發布日期")),
                            ],
                            rows: const [
                              DataRow(cells: [
                                DataCell(Text("健康焦點")),
                                DataCell(Text("學生團體保險休學加保自2024.2.24截止")),
                                DataCell(Text("2024-01-01")),
                              ]),
                              DataRow(cells: [
                                DataCell(Text("活動消息")),
                                DataCell(Text("教職員體重控制班報名額滿")),
                                DataCell(Text("2024-03-01")),
                              ]),
                              DataRow(cells: [
                                DataCell(Text("健康焦點")),
                                DataCell(Text("學生團體保險休學加保自2024.2.24截止")),
                                DataCell(Text("2024-01-01")),
                              ]),
                              DataRow(cells: [
                                DataCell(Text("活動消息")),
                                DataCell(Text("教職員體重控制班報名額滿")),
                                DataCell(Text("2024-03-01")),
                              ]),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),

                  // 餐廳檢查報告
                  const SizedBox(height: 20),
                  const Text(
                    "餐廳檢查報告",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Divider(thickness: 3),
                  Row(
                    children: [
                      Expanded(
                        child: Card(
                          child: DataTable(
                            headingTextStyle:
                                const TextStyle(fontWeight: FontWeight.bold),
                            columns: const [
                              DataColumn(label: Text("日期")),
                              DataColumn(label: Text("餐廳名稱")),
                              DataColumn(label: Text("檢核結果")),
                            ],
                            rows: [
                              DataRow(cells: [
                                const DataCell(Text("2024-02-08")),
                                const DataCell(Text("拉拉小廚冰塊")),
                                DataCell(Card(
                                  color: Colors.lightGreen.shade100,
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                      vertical: 4,
                                      horizontal: 12,
                                    ),
                                    child: Text("合格"),
                                  ),
                                )),
                              ]),
                              DataRow(cells: [
                                const DataCell(Text("2024-02-08")),
                                const DataCell(Text("漢堡王冰塊")),
                                DataCell(Card(
                                  color: Colors.lightGreen.shade100,
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                      vertical: 4,
                                      horizontal: 12,
                                    ),
                                    child: Text("合格"),
                                  ),
                                )),
                              ]),
                              DataRow(cells: [
                                const DataCell(Text("2024-02-08")),
                                const DataCell(Text("星巴克冰塊")),
                                DataCell(Card(
                                  color: Theme.of(context)
                                      .colorScheme
                                      .errorContainer,
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                      vertical: 4,
                                      horizontal: 12,
                                    ),
                                    child: Text("不合格"),
                                  ),
                                )),
                              ]),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
