import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/enum/post_column.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/dialog/login_dialog.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/public/home_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({
    super.key,
    this.toLogin = false,
  });

  final bool toLogin;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
    final _menu = PageTopic.asMap();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      if (widget.toLogin) {
        showDialog(
          context: context,
          builder: (context) => const LoginDialog(),
        ).then((value) {
          if (value == null) context.go(Routes.root.path);
        });
      }
      context.read<HomePageViewModel>().getPost();
    });
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: LayoutBuilder(
        builder: (context, constrain) {
          final platform = context.read<PlatformViewModel>().platform;
          return Consumer<HomePageViewModel>(
            builder: (context, value, child) => Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 側邊索引欄
                if (platform != Platform.mobile)
                  Expanded(
                    flex: platform == Platform.computer ? 5 : 6,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        for (var group in _menu.entries)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: Card(
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 5),
                                child: Column(
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 5),
                                      child: Text(
                                        group.key.label,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                    platform == Platform.computer
                                        ? const Divider(
                                            indent: 50,
                                            endIndent: 50,
                                          )
                                        : const Divider(
                                            indent: 30,
                                            endIndent: 30,
                                          ),
                                    for (var link in group.value)
                                      Padding(
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 5),
                                        child: TextButton(
                                          onPressed: () {},
                                          child: Text(
                                            link.label,
                                            softWrap: false,
                                            overflow: TextOverflow.fade,
                                            textAlign: TextAlign.center,
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
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
                              4,
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
                              onSelectionChanged: (selected) {
                                value.column = selected.first;
                                value.getPost();
                              },
                              selected: {value.column},
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
                                headingTextStyle: const TextStyle(
                                    fontWeight: FontWeight.bold),
                                columns: [
                                  const DataColumn(label: Text("訊息類別")),
                                  const DataColumn(label: Text("主題")),
                                  if (platform != Platform.mobile)
                                    const DataColumn(label: Text("發布日期")),
                                ],
                                rows: [
                                  for (var post in value.posts)
                                    if (post.visible)
                                      DataRow(cells: [
                                        DataCell(Text(post.column.label)),
                                        DataCell(Row(
                                          children: [
                                            if (!post.important)
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                  right: 5,
                                                ),
                                                child: Icon(
                                                  FontAwesomeIcons
                                                      .fireFlameCurved,
                                                  size: 12,
                                                  color: Colors.red.shade700,
                                                ),
                                              ),
                                            Text(
                                              post.title,
                                              overflow: TextOverflow.fade,
                                              softWrap: false,
                                            ),
                                          ],
                                        )),
                                        if (platform != Platform.mobile)
                                          DataCell(Text(DateFormat("yyyy-MM-dd")
                                              .format(post.createTime))),
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
                      const SizedBox(height: 10),
                      // 餐廳檢查報告內容
                      Row(
                        children: [
                          Expanded(
                            child: Card(
                              child: DataTable(
                                headingTextStyle: const TextStyle(
                                    fontWeight: FontWeight.bold),
                                columns: [
                                  const DataColumn(label: Text("餐廳名稱")),
                                  const DataColumn(label: Text("檢驗結果")),
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
            ),
          );
        },
      ),
    );
  }
}
