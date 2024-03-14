import 'package:file_picker/_internal/file_picker_web.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/enum/restaurant_option.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:omni_datetime_picker/omni_datetime_picker.dart';

class RestaurantEditPage extends StatefulWidget {
  const RestaurantEditPage(
    this.id, {
    super.key,
  });

  final String id;

  @override
  State<RestaurantEditPage> createState() => _RestaurantEditPageState();
}

class _RestaurantEditPageState extends State<RestaurantEditPage> {
  final _nameTextController = TextEditingController();
  final _dateTextController = TextEditingController();
  RestaurantInspectionItem _inspectionItem =
      RestaurantInspectionItem.values.first;
  bool _passedInspection = false;

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 表單內容
          Row(
            children: [
              // 餐廳名稱
              Expanded(
                child: TextFormField(
                  controller: _nameTextController,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    icon: Icon(Icons.restaurant),
                    label: Text("餐廳名稱"),
                  ),
                ),
              ),
              const SizedBox(width: 40),

              // 日期選取
              Expanded(
                child: TextFormField(
                  controller: _dateTextController,
                  onTap: () async {
                    FocusScope.of(context).requestFocus(FocusNode());
                    DateTime? date = await showOmniDateTimePicker(
                      context: context,
                      firstDate:
                          DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now(),
                      type: OmniDateTimePickerType.date,
                      initialDate: DateTime.tryParse(_dateTextController.text),
                    );
                    if (date != null) {
                      _dateTextController.text =
                          date.toIso8601String().substring(0, 10);
                    }
                  },
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    icon: Icon(Icons.calendar_today),
                    label: Text("日期"),
                  ),
                ),
              ),
              const SizedBox(width: 40),

              // 發布/轉為草稿
              CleanButton(
                onPressed: () {},
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 5),
                    child: Column(
                      children: [
                        Switch(
                          value: true,
                          onChanged: (result) {},
                          thumbIcon: MaterialStateProperty.resolveWith(
                            (states) => Icon(
                                states.contains(MaterialState.selected)
                                    ? Icons.star
                                    : Icons.edit),
                          ),
                        ),
                        const Text(
                          true ? "發佈" : "草稿",
                          style: TextStyle(color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              // 檢驗項目
              Expanded(
                child: DropdownButtonFormField<RestaurantInspectionItem>(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    icon: Icon(FontAwesomeIcons.clipboardList),
                    label: Text("檢驗項目"),
                  ),
                  items: RestaurantInspectionItem.values
                      .map((e) => DropdownMenuItem(
                            value: e,
                            child: Text(e.label),
                          ))
                      .toList(),
                  onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
                  onChanged: (selected) {
                    setState(() {
                      if (selected == null) return;
                      _inspectionItem = selected;
                    });
                  },
                  value: _inspectionItem,
                ),
              ),
              const SizedBox(width: 40),

              // 通過檢驗
              Container(
                constraints: const BoxConstraints(minHeight: 56),
                child: CleanButton(
                  onPressed: () => setState(() {
                    _passedInspection = !_passedInspection;
                  }),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Checkbox(
                        value: _passedInspection,
                        onChanged: (checked) {
                          setState(() {
                            if (checked == null) return;
                            _passedInspection = checked;
                          });
                        },
                      ),
                      const SizedBox(width: 10),
                      const Text(
                        "是否通過檢驗",
                        style: TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 60),

          // TODO: 上傳預覽

          // 功能按鈕們
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              // 刪除按鈕
              TextButton.icon(
                style: TextButtonStyle.rRectStyle(),
                onPressed: () async {
                  await showDialog(
                    context: context,
                    builder: (context) => const PostDeleteDialog(),
                  );
                },
                icon: const Icon(Icons.delete),
                label: const Text("刪除", style: TextStyle(fontSize: 16)),
              ),

              // 取消按鈕
              const SizedBox(width: 20),
              OutlinedButton.icon(
                style: OutlinedButtonStyle.rRectStyle(),
                onPressed: () => context.pushReplacement(Routes.postList.path),
                icon: const Icon(Icons.cancel),
                label: const Text("取消", style: TextStyle(fontSize: 16)),
              ),

              // 上傳附件按鈕
              const SizedBox(width: 20),
              OutlinedButton.icon(
                style: OutlinedButtonStyle.rRectStyle(),
                onPressed: () async {
                  final result = await FilePickerWeb.platform.pickFiles(
                    type: FileType.custom,
                    allowedExtensions: [
                      "pdf",
                      "jpg",
                      "jpeg",
                      "png",
                      "doc",
                      "docx",
                      "xls",
                      "xlsx",
                      "ppt",
                      "pptx",
                      "odt",
                      "csv",
                    ],
                  );
                  if (result == null) return;
                  final blob = result.files.single.bytes;
                  final name = result.files.single.name;
                  if (blob == null) return;
                  // await value.uploadAttachment(blob, name);
                },
                icon: const Icon(Icons.upload_file_rounded),
                label: const Text("上傳附件", style: TextStyle(fontSize: 16)),
              ),

              // 儲存按鈕
              const SizedBox(width: 20),
              OutlinedButton.icon(
                style: OutlinedButtonStyle.rRectStyle(),
                onPressed: () async {
                  // value.uploadPost(
                  //   title: _titleTextController.text,
                  //   content: json
                  //       .encode(_quillController.document.toDelta().toJson()),
                  // );
                  // if (context.mounted) {
                  //   context.pushReplacement(Routes.postList.path);
                  // }
                },
                icon: const Icon(Icons.save),
                label: const Text("保存變更", style: TextStyle(fontSize: 16)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
