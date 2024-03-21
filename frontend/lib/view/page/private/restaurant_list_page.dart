import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view/widget/inspect_result_card.dart';
import 'package:health_care_website/view_model/private/restaurant_list_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:omni_datetime_picker/omni_datetime_picker.dart';
import 'package:provider/provider.dart';

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
                // 新增餐廳
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
                  label: const Text("新增餐廳檢驗"),
                ),
                const SizedBox(width: 20),

                // TODO: 下載報表
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    late final DateTime? startDate, endDate;
                    startDate = await showOmniDateTimePicker(
                      context: context,
                      lastDate: DateTime.now(),
                      type: OmniDateTimePickerType.date,
                      title: const Padding(
                        padding: EdgeInsets.only(top: 10),
                        child: Text(
                          "開始日期",
                          style: TextStyle(fontSize: 16),
                        ),
                      ),
                    );
                    if (context.mounted && startDate != null) {
                      endDate = await showOmniDateTimePicker(
                        context: context,
                        lastDate: DateTime.now(),
                        type: OmniDateTimePickerType.date,
                        title: const Padding(
                          padding: EdgeInsets.only(top: 10),
                          child: Text(
                            "結束日期",
                            style: TextStyle(fontSize: 16),
                          ),
                        ),
                      );
                      if (kDebugMode) {
                        print(startDate);
                        print(endDate);
                      }
                    } else {
                      return;
                    }
                  },
                  icon: const Icon(Icons.download),
                  label: const Text("下載報表"),
                ),
              ],
            ),
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    headingTextStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                    columns: const [
                      DataColumn(label: Text("餐廳名稱")),
                      DataColumn(label: Text("日期")),
                      DataColumn(label: Text("檢驗項目")),
                      DataColumn(label: Text("檢驗結果")),
                      DataColumn(label: Text("發布狀態")),
                      DataColumn(label: Text("編輯")),
                    ],
                    rows: [
                      for (var restaurant in value.restaurants)
                        DataRow(cells: [
                          DataCell(Text(restaurant.title)),
                          DataCell(Text(DateFormat("yyyy-MM-dd")
                              .format(restaurant.updateTime))),
                          DataCell(Text(restaurant.item.label)),
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
          ],
        ),
      ),
    );
  }
}
