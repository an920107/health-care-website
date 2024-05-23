import 'package:file_picker/_internal/file_picker_web.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/enum/restaurant_inspection_item.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/attachment_preview.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/private/restaurant_edit_page_view_model.dart';
import 'package:omni_datetime_picker/omni_datetime_picker.dart';
import 'package:provider/provider.dart';

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
  late Future<Restaurant?> Function(String) _future;

  final _nameTextController = TextEditingController();
  final _itemTextController = TextEditingController();
  final _dateTextController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _future = context.read<RestaurantEditPageViewModel>().fetchFromServer;
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: FutureBuilder(
          future: _future(widget.id).then((value) {
            _nameTextController.text = value!.title;
            _dateTextController.text =
                value.inspectTime.toIso8601String().substring(0, 10);
          }),
          builder: (context, snapshot) {
            // Loading 圈圈
            if (snapshot.connectionState != ConnectionState.done) {
              return const LoadingCircle();
            }

            return Consumer<RestaurantEditPageViewModel>(
              builder: (context, value, child) => Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // 表單內容
                    Row(
                      children: [
                        // 商家名稱
                        Expanded(
                          child: TextFormField(
                            controller: _nameTextController,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              icon: Icon(Icons.restaurant),
                              label: Text("商家名稱"),
                            ),
                            validator: value.titleValidator,
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
                                lastDate: DateTime.now(),
                                type: OmniDateTimePickerType.date,
                                initialDate:
                                    DateTime.tryParse(_dateTextController.text),
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
                          onPressed: () => value.visible = !value.visible,
                          child: Card(
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 5),
                              child: Column(
                                children: [
                                  Switch(
                                    value: value.visible,
                                    onChanged: (result) => value.visible = result,
                                    thumbIcon: MaterialStateProperty.resolveWith(
                                      (states) => Icon(
                                          states.contains(MaterialState.selected)
                                              ? Icons.star
                                              : Icons.edit),
                                    ),
                                  ),
                                  Text(
                                    value.visible ? "發佈" : "草稿",
                                    style: const TextStyle(color: Colors.black54),
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
                          child: DropdownButtonFormField<
                              RestaurantInspectionCategory>(
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              icon: Icon(FontAwesomeIcons.clipboardList),
                              label: Text("檢驗項目"),
                            ),
                            items: RestaurantInspectionCategory.values
                                .map((e) => DropdownMenuItem(
                                      value: e,
                                      child: Text(e.label),
                                    ))
                                .toList(),
                            onTap: () =>
                                FocusScope.of(context).requestFocus(FocusNode()),
                            onChanged: (selected) {
                              if (selected == null) return;
                              value.selectedRestaurantItem = selected;
                            },
                            value: value.selectedRestaurantItem,
                          ),
                        ),
                        const SizedBox(width: 40),
                
                        // 抽檢樣品
                        Expanded(
                          child: TextFormField(
                            controller: _itemTextController,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              icon: Icon(Icons.fastfood),
                              label: Text("抽檢樣品"),
                            ),
                            validator: (text) => value.titleValidator(text, 8),
                          ),
                        ),
                        const SizedBox(width: 40),
                
                        // 通過檢驗
                        Container(
                          constraints: const BoxConstraints(minHeight: 56),
                          child: CleanButton(
                            onPressed: () =>
                                value.passedInspection = !value.passedInspection,
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Checkbox(
                                  value: value.passedInspection,
                                  onChanged: (checked) {
                                    if (checked == null) return;
                                    value.passedInspection = checked;
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
                
                    // 附件預覽
                    if (value.attachments.isNotEmpty) const SizedBox(height: 20),
                    GridView.count(
                      shrinkWrap: true,
                      crossAxisCount: 4,
                      mainAxisSpacing: 20,
                      crossAxisSpacing: 20,
                      childAspectRatio: 4,
                      children: value.attachments
                          .map((e) => AttachmentPreview(
                                info: e,
                                removeCallback: () async =>
                                    value.removeAttachment(e.id),
                              ))
                          .toList(),
                    ),
                
                    // 功能按鈕們
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        // 刪除按鈕
                        TextButton.icon(
                          style: TextButtonStyle.rRectStyle(),
                          onPressed: () async {
                            final result = await showDialog(
                              context: context,
                              builder: (context) => const DeleteDialog(),
                            );
                            if (result == true) {
                              await value.delete();
                              if (context.mounted) {
                                context
                                    .pushReplacement(Routes.restaurantList.path);
                              }
                            }
                          },
                          icon: const Icon(Icons.delete),
                          label: const Text("刪除", style: TextStyle(fontSize: 16)),
                        ),
                
                        // 取消按鈕
                        const SizedBox(width: 20),
                        OutlinedButton.icon(
                          style: OutlinedButtonStyle.rRectStyle(),
                          onPressed: () => context.go(Routes.restaurantList.path),
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
                            await value.uploadAttachment(blob, name);
                          },
                          icon: const Icon(Icons.upload_file_rounded),
                          label:
                              const Text("上傳附件", style: TextStyle(fontSize: 16)),
                        ),
                
                        // 儲存按鈕
                        const SizedBox(width: 20),
                        OutlinedButton.icon(
                          style: OutlinedButtonStyle.rRectStyle(),
                          onPressed: () async {
                            if (!_formKey.currentState!.validate()) {
                              return;
                            }
                            await value.uploadRestaurant(
                              title: _nameTextController.text,
                              item: _itemTextController.text,
                              inspectTime:
                                  DateTime.parse(_dateTextController.text),
                            );
                            if (context.mounted) {
                              context.pushReplacement(Routes.restaurantList.path);
                            }
                          },
                          icon: const Icon(Icons.save),
                          label:
                              const Text("保存變更", style: TextStyle(fontSize: 16)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          }),
    );
  }
}
