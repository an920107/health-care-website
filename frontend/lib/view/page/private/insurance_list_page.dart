import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/page_number_indicator.dart';
import 'package:health_care_website/view_model/private/insurance_list_page_view_model.dart';
import 'package:provider/provider.dart';

class InsuranceListPage extends StatefulWidget {
  const InsuranceListPage({super.key});

  @override
  State<InsuranceListPage> createState() => _InsuranceListPageState();
}

class _InsuranceListPageState extends State<InsuranceListPage> {
  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<InsuranceListPageViewModel>(
        builder: (context, value, child) => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // 新增保險
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    // final restaurant = await value.createNewRestaurant();
                    // if (restaurant == null) return;
                    // await value.updateRestaurantList();
                    // if (context.mounted) {
                    //   context.push(
                    //       "${Routes.restaurantEdit.path}/${restaurant.id}");
                    // }
                  },
                  icon: const Icon(Icons.add),
                  label: const Text("新增保險申請"),
                ),
                const SizedBox(width: 20),

                // 下載報表
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    // final range = await showCalendarDatePicker2Dialog(
                    //   context: context,
                    //   dialogSize: const Size(325, 400),
                    //   config: CalendarDatePicker2WithActionButtonsConfig(
                    //     lastDate: DateTime.now(),
                    //     calendarType: CalendarDatePicker2Type.range,
                    //     centerAlignModePicker: true,
                    //   ),
                    // );
                    // if (range != null && context.mounted) {
                    //   if (range.length != 2 ||
                    //       range[0] == null ||
                    //       range[1] == null) {
                    //     await showDialog(
                    //       context: context,
                    //       builder: (context) => AlertDialog(
                    //         title: const Text("錯誤"),
                    //         content: const Text("未選取日期範圍"),
                    //         actions: [
                    //           TextButton(
                    //             onPressed: () => Navigator.of(context).pop(),
                    //             child: const Text("確認"),
                    //           ),
                    //         ],
                    //       ),
                    //     );
                    //   } else {
                    //     launchUrl(value.getStatsUrl(range[0]!, range[1]!));
                    //   }
                    // }
                  },
                  icon: const Icon(Icons.download),
                  label: const Text("下載報表"),
                ),
              ],
            ),
            // 保險列表
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    headingTextStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                    columns: const [
                      DataColumn(label: Text("姓名")),
                      DataColumn(label: Text("學號")),
                      DataColumn(label: Text("意外發生日期")),
                      DataColumn(label: Text("上次修改日期")),
                      DataColumn(label: Text("編輯")),
                    ],
                    rows: [
                      DataRow(cells: [
                        const DataCell(Text("張電皓")),
                        const DataCell(Text("123456789")),
                        const DataCell(Text("2024-01-01")),
                        const DataCell(Text("2024-01-03")),
                        DataCell(IconButton(
                          onPressed: () {
                            context.push("${Routes.insuranceEdit.path}/1");
                          },
                          icon: const Icon(Icons.edit),
                        )),
                      ]),
                    ],
                  ),
                ),
              ],
            ),
            // 頁數
            const SizedBox(height: 10),
            PageNumberIndicator(
              currentPage: 1, // value.page,
              totalPage: 1, // value.totalPage,
              onAdjust: (increment) async {},
              // => await value.restaurantAdjustPageNumber(increment),
            ),
          ],
        ),
      ),
    );
  }
}
