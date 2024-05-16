import 'dart:async';

import 'package:flutter/material.dart';
import 'package:health_care_website/model/dengue/building.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:health_care_website/view_model/private/dengue_management_page_view_model.dart';
import 'package:provider/provider.dart';

class DengueManagementPage extends StatefulWidget {
  const DengueManagementPage({super.key});

  @override
  State<DengueManagementPage> createState() => _DengueManagementPageState();
}

class _DengueManagementPageState extends State<DengueManagementPage> {
  final _buildingFromKey = const GlobalObjectKey<FormState>("builgind");
  final _buildingTextController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<DengueManagementPageViewModel>().fetchFromServer();
    });
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<DengueManagementPageViewModel>(
        builder: (context, value, child) => Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 登革熱填報管理
            const Text(
              "登革熱填報管理",
              softWrap: true,
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            Form(
              key: _buildingFromKey,
              child: Row(
                children: [
                  // 新增建物
                  Expanded(
                    child: TextFormField(
                      controller: _buildingTextController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        icon: Icon(Icons.business),
                        label: Text("建物名稱"),
                      ),
                      validator: (text) =>
                          (text ?? "").trim().isEmpty ? "名稱不得為空" : null,
                    ),
                  ),
                  const SizedBox(width: 20),
                  ElevatedButton.icon(
                    style: ElevatedButtonStyle.rRectStyle(),
                    onPressed: () async {
                      if (!_buildingFromKey.currentState!.validate()) return;
                      await value
                          .createBuilding(_buildingTextController.text.trim());
                      _buildingTextController.clear();
                    },
                    icon: const Icon(Icons.add),
                    label: const Text("新增建物"),
                  ),
                  const SizedBox(width: 20),
                  // 下載報表
                  ElevatedButton.icon(
                    style: ElevatedButtonStyle.rRectStyle(),
                    onPressed: () async {
                      // TODO: MonthYearPicker has been out of date, so we need to 
                      //  use another method to select year & month.

                      // final begin = await showMonthYearPicker(
                      //   context: context,
                      //   initialDate: DateTime.now(),
                      //   firstDate: DateTime.fromMillisecondsSinceEpoch(0),
                      //   lastDate: DateTime.now(),
                      // );
                      // if (begin == null || !context.mounted) return;
                      // final end = await showMonthYearPicker(
                      //   context: context,
                      //   initialDate: DateTime.now(),
                      //   firstDate: begin,
                      //   lastDate: DateTime.now(),
                      // );
                      // if (end == null || !context.mounted) return;
                      // launchUrl(value.getStatsUrl(begin, end));
                    },
                    icon: const Icon(Icons.file_download),
                    label: const Text("下載報表"),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // 建物列表
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    headingTextStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                    columns: const [
                      DataColumn(label: Text("建物名稱")),
                      DataColumn(label: Text("建物管理員")),
                      DataColumn(label: Text("刪除")),
                    ],
                    rows: [
                      for (var building in value.buildings)
                        DataRow(cells: [
                          DataCell(Text(building.name)),
                          DataCell(building.userId.trim().isNotEmpty
                              ? TextButton.icon(
                                  onPressed: () async =>
                                      onBuildingManagerPressed(building),
                                  icon: const Icon(Icons.edit),
                                  label: Text(building.userId),
                                )
                              : IconButton(
                                  onPressed: () async =>
                                      onBuildingManagerPressed(building),
                                  icon: const Icon(Icons.add),
                                )),
                          DataCell(IconButton(
                            onPressed: () async {
                              final deleteConfirm = await showDialog(
                                context: context,
                                builder: (_) => const DeleteDialog(),
                              );
                              if (deleteConfirm == true) {
                                await value.deleteBuilding(building);
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

  Future<void> onBuildingManagerPressed(Building building) async {
    String? id = await showDialog(
      context: context,
      builder: (_) => _enterIdDialog(building.userId),
    );
    if (id == null || !mounted) return;

    // TODO: 查無使用者
    await context
        .read<DengueManagementPageViewModel>()
        .patchBuildingUser(building, id);
  }

  Widget _enterIdDialog(String originalId) {
    final textController = TextEditingController(text: originalId);

    return AlertDialog(
      title: const Text("請輸入建物管理員的 Protal 帳號"),
      content: TextField(
        controller: textController,
        decoration: const InputDecoration(
          border: OutlineInputBorder(),
          icon: Icon(Icons.person),
          label: Text("Protal 帳號"),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(null),
          child: const Text("取消"),
        ),
        TextButton(
          onPressed: () => Navigator.of(context).pop(""),
          child: const Text("重置"),
        ),
        TextButton(
          onPressed: () async {
            final id = textController.text.trim();
            if (id.isEmpty) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("建物管理員帳號不可為空"),
                ),
              );
              Navigator.of(context).pop(null);
            } else {
              Navigator.of(context).pop(id);
            }
          },
          child: const Text("確定"),
        ),
      ],
    );
  }
}
