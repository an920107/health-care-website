import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:health_care_website/view_model/private/dengue_list_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class DengueListPage extends StatefulWidget {
  const DengueListPage({super.key});

  @override
  State<DengueListPage> createState() => _DengueListPageState();
}

class _DengueListPageState extends State<DengueListPage> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    context.read<DengueListPageViewModel>().fetchFromServer();
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<DengueListPageViewModel>(
        builder: (context, value, child) => Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "歷史填報紀錄",
                  softWrap: true,
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () => context.push(Routes.dengueForm.path),
                  icon: const Icon(Icons.add),
                  label: const Text("新增檢查報告"),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    columns: const [
                      DataColumn(label: Text("建物名稱")),
                      DataColumn(label: Text("檢查月份")),
                      DataColumn(label: Text("填表時間")),
                      DataColumn(label: Text("下載")),
                      DataColumn(label: Text("刪除")),
                    ],
                    rows: [
                      for (var dengue in value.dengues)
                        DataRow(cells: [
                          DataCell(Text(dengue.buildingName ??
                              "[id: ${dengue.buildingId}]")),
                          DataCell(Text(
                            DateFormat("yyyy 年 MM 月").format(dengue.filledTime),
                          )),
                          DataCell(Text(
                            DateFormat("yyyy-MM-dd HH:mm:ss")
                                .format(dengue.createTime),
                          )),
                          DataCell(IconButton(
                            onPressed: () async {
                              // TODO: download
                            },
                            icon: const Icon(Icons.download),
                          )),
                          DataCell(IconButton(
                            onPressed: () async {
                              final deleteConfirm = await showDialog(
                                context: context,
                                builder: (_) => const DeleteDialog(),
                              );
                              if (deleteConfirm == true) {
                                value.deleteDengue(dengue);
                              }
                            },
                            icon: const Icon(Icons.delete, color: Colors.red),
                          )),
                        ]),
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
