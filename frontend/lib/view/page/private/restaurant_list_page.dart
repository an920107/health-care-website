import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:omni_datetime_picker/omni_datetime_picker.dart';

class RestaurantListPage extends StatelessWidget {
  const RestaurantListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              // 新增餐廳
              ElevatedButton.icon(
                style: ElevatedButtonStyle.rRectStyle(),
                onPressed: () async {
                  // final post = await value.createNewPost();
                  // if (post == null) return;
                  // await value.updatePostList();
                  // if (context.mounted) {
                  //   context.push("${Routes.postEdit.path}/${post.id}");
                  // }
                },
                icon: const Icon(Icons.add),
                label: const Text("新增餐廳檢驗"),
              ),
              const SizedBox(width: 20),

              // 下載報表
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
                    // for (var post in value.posts)
                    //   DataRow(cells: [
                    //     DataCell(Text(post.title)),
                    //     DataCell(Text(post.column.label)),
                    //     DataCell(Text(DateFormat("yyyy-MM-dd")
                    //         .format(post.updateTime))),
                    //     DataCell(Checkbox(
                    //       value: post.important,
                    //       onChanged: (checked) => value.togglePostImportant(post),
                    //     )),
                    //     DataCell(IconText(
                    //       mainAxisSize: MainAxisSize.min,
                    //       icon: Icon(post.visible
                    //           ? Icons.domain_verification_rounded
                    //           : Icons.edit_document),
                    //       child: Text(post.visible ? "已發佈" : "草稿"),
                    //     )),
                    //     DataCell(IconButton(
                    //       onPressed: () {
                    //         context.push("${Routes.postEdit.path}/${post.id}");
                    //       },
                    //       icon: const Icon(Icons.edit),
                    //     )),
                    //   ])
                    DataRow(cells: [
                      const DataCell(Text("勛皓的電")),
                      const DataCell(Text("2024-03-14")),
                      const DataCell(Text("熟食")),
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
                      const DataCell(IconText(
                        mainAxisSize: MainAxisSize.min,
                        icon: Icon(true
                            ? Icons.domain_verification_rounded
                            : Icons.edit_document),
                        child: Text(true ? "已發佈" : "草稿"),
                      )),
                      DataCell(IconButton(
                        onPressed: () {
                          context.push("${Routes.restaurantEdit.path}/1");
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
    );
  }
}
