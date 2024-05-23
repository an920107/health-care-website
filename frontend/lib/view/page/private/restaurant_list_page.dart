import 'package:calendar_date_picker2/calendar_date_picker2.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view/widget/inspect_result_card.dart';
import 'package:health_care_website/view/widget/page_number_indicator.dart';
import 'package:health_care_website/view_model/private/restaurant_list_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class RestaurantListPage extends StatefulWidget {
  const RestaurantListPage({super.key});

  @override
  State<RestaurantListPage> createState() => _RestaurantListPageState();
}

class _RestaurantListPageState extends State<RestaurantListPage> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    context.read<RestaurantListPageViewModel>().updateRestaurantList();
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<RestaurantListPageViewModel>(
        builder: (context, value, child) => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // 新增商家
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    final restaurant = await value.createNewRestaurant();
                    if (restaurant == null) return;
                    await value.updateRestaurantList();
                    if (context.mounted) {
                      context.push(
                          "${Routes.restaurantEdit.path}/${restaurant.id}");
                    }
                  },
                  icon: const Icon(Icons.add),
                  label: const Text("新增商家檢驗"),
                ),
                const SizedBox(width: 20),

                // 下載報表
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    final range = await showCalendarDatePicker2Dialog(
                      context: context,
                      dialogSize: const Size(325, 400),
                      config: CalendarDatePicker2WithActionButtonsConfig(
                        lastDate: DateTime.now(),
                        calendarType: CalendarDatePicker2Type.range,
                        centerAlignModePicker: true,
                      ),
                    );
                    if (range != null && context.mounted) {
                      if (range.length != 2 ||
                          range[0] == null ||
                          range[1] == null) {
                        await showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            title: const Text("錯誤"),
                            content: const Text("未選取日期範圍"),
                            actions: [
                              TextButton(
                                onPressed: () => Navigator.of(context).pop(),
                                child: const Text("確認"),
                              ),
                            ],
                          ),
                        );
                      } else {
                        launchUrl(value.getStatsUrl(range[0]!, range[1]!));
                      }
                    }
                  },
                  icon: const Icon(Icons.download),
                  label: const Text("下載報表"),
                ),
              ],
            ),

            // 列表內容
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    headingTextStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                    columns: const [
                      DataColumn(label: Text("商家名稱")),
                      DataColumn(label: Text("抽檢日期")),
                      DataColumn(label: Text("檢驗項目")),
                      DataColumn(label: Text("抽檢樣品")),
                      DataColumn(label: Text("檢驗結果")),
                      DataColumn(label: Text("發布狀態")),
                      DataColumn(label: Text("編輯")),
                    ],
                    rows: [
                      for (var restaurant in value.restaurants)
                        DataRow(cells: [
                          DataCell(Text(restaurant.title)),
                          DataCell(Text(DateFormat("yyyy-MM-dd")
                              .format(restaurant.inspectTime))),
                          DataCell(Text(restaurant.category.label)),
                          DataCell(Text(restaurant.item)),
                          DataCell(InspectResultCard(restaurant.valid)),
                          DataCell(IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: Icon(restaurant.visible
                                ? Icons.domain_verification_rounded
                                : Icons.edit_document),
                            child: Text(restaurant.visible ? "已發佈" : "草稿"),
                          )),
                          DataCell(IconButton(
                            onPressed: () {
                              context.push(
                                  "${Routes.restaurantEdit.path}/${restaurant.id}");
                            },
                            icon: const Icon(Icons.edit),
                          )),
                        ])
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            PageNumberIndicator(
              currentPage: value.page,
              totalPage: value.totalPage,
              onAdjust: (increment) async =>
                  await value.restaurantAdjustPageNumber(increment),
            ),
          ],
        ),
      ),
    );
  }
}
