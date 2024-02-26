import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:provider/provider.dart';

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
    return BaseScaffold(
      body: LayoutBuilder(
        builder: (context, constrain) {
          final platform = context.read<PlatformViewModel>().platform;

          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 側邊索引欄
              if (platform != Platform.mobile)
                Expanded(
                  flex: 5,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Card(
                        child: Padding(
                          padding: EdgeInsets.symmetric(vertical: 10),
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
                        ),
                      ),
                      const SizedBox(height: 5),
                      Card(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              for (var str in _routes)
                                Column(
                                  children: [
                                    TextButton(
                                      onPressed: () {},
                                      child: Text(str,
                                          textAlign: TextAlign.center),
                                    ),
                                    if (str != _routes.last)
                                      const Divider(
                                        indent: 20,
                                        endIndent: 20,
                                      ),
                                  ],
                                ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              if (platform != Platform.mobile) const Spacer(flex: 1),

              // 內容
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
                    const IconText(
                      mainAxisSize: MainAxisSize.min,
                      icon: Icon(FontAwesomeIcons.bullhorn),
                      child: Text(
                        "NEWS",
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const Divider(thickness: 3),
                    const SizedBox(height: 10),
                    // 單選按鈕群組
                    Row(
                      children: [
                        Expanded(
                          child: SegmentedButton<PostColumn?>(
                            style: SegmentedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              padding: EdgeInsets.symmetric(
                                  vertical:
                                      platform == Platform.mobile ? 0 : 16,
                                  horizontal: 12),
                              textStyle: platform == Platform.mobile
                                  ? const TextStyle(fontSize: 11)
                                  : null,
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
                            showSelectedIcon: platform != Platform.mobile,
                            selectedIcon: const Icon(Icons.view_agenda),
                            onSelectionChanged: (selected) => setState(
                                () => _selectedPostColumn = selected.first),
                            selected: {_selectedPostColumn},
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // 公告內容
                    Row(
                      children: [
                        Expanded(
                          child: Card(
                            child: DataTable(
                              headingTextStyle:
                                  const TextStyle(fontWeight: FontWeight.bold),
                              columns: [
                                const DataColumn(label: Text("訊息類別")),
                                const DataColumn(label: Text("主題")),
                                if (platform != Platform.mobile)
                                  const DataColumn(label: Text("發布日期")),
                              ],
                              rows: [
                                DataRow(cells: [
                                  const DataCell(Text("健康焦點")),
                                  const DataCell(Text(
                                    "學生團體保險休學加保自 2024.2.24 截止",
                                    overflow: TextOverflow.fade,
                                    softWrap: false,
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-01-01")),
                                ]),
                                DataRow(cells: [
                                  const DataCell(Text("活動消息")),
                                  const DataCell(Text(
                                    "教職員體重控制班報名額滿",
                                    overflow: TextOverflow.fade,
                                    softWrap: false,
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-03-01")),
                                ]),
                                DataRow(cells: [
                                  const DataCell(Text("健康焦點")),
                                  const DataCell(Text(
                                    "學生團體保險休學加保自 2024.2.24 截止",
                                    overflow: TextOverflow.fade,
                                    softWrap: false,
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-01-01")),
                                ]),
                                DataRow(cells: [
                                  const DataCell(Text("活動消息")),
                                  const DataCell(Text(
                                    "教職員體重控制班報名額滿",
                                    overflow: TextOverflow.fade,
                                    softWrap: false,
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-03-01")),
                                ]),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),

                    // 餐廳檢查報告
                    const SizedBox(height: 20),
                    const IconText(
                      mainAxisSize: MainAxisSize.min,
                      icon: Icon(FontAwesomeIcons.solidFileLines),
                      child: Text(
                        "餐廳檢查報告",
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const Divider(thickness: 3),
                    // 餐廳檢查報告內容
                    Row(
                      children: [
                        Expanded(
                          child: Card(
                            child: DataTable(
                              headingTextStyle:
                                  const TextStyle(fontWeight: FontWeight.bold),
                              columns: [
                                const DataColumn(label: Text("餐廳名稱")),
                                const DataColumn(label: Text("檢核結果")),
                                if (platform != Platform.mobile)
                                  const DataColumn(label: Text("日期")),
                              ],
                              rows: [
                                DataRow(cells: [
                                  const DataCell(Text("拉拉小廚冰塊")),
                                  DataCell(Card(
                                    color: Colors.lightGreen.shade100,
                                    child: const Padding(
                                      padding: EdgeInsets.symmetric(
                                        vertical: 4,
                                        horizontal: 12,
                                      ),
                                      child: Text("合　格"),
                                    ),
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-02-08")),
                                ]),
                                DataRow(cells: [
                                  const DataCell(Text("漢堡王冰塊")),
                                  DataCell(Card(
                                    color: Colors.lightGreen.shade100,
                                    child: const Padding(
                                      padding: EdgeInsets.symmetric(
                                        vertical: 4,
                                        horizontal: 12,
                                      ),
                                      child: Text("合　格"),
                                    ),
                                  )),
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-02-08")),
                                ]),
                                DataRow(cells: [
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
                                  if (platform != Platform.mobile)
                                    const DataCell(Text("2024-02-08")),
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
          );
        },
      ),
    );
  }
}
