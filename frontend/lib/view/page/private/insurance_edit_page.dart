import 'package:file_picker/_internal/file_picker_web.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/model/insurance/insurance.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/datetime_form_field.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';

class InsuranceEditPage extends StatefulWidget {
  const InsuranceEditPage(
    this.id, {
    super.key,
  });

  final String id;

  @override
  State<InsuranceEditPage> createState() => _InsuranceEditPageState();
}

class _InsuranceEditPageState extends State<InsuranceEditPage> {
  final _accidentDateTextController = TextEditingController();
  final _claimDateTextController = TextEditingController();
  final _applicationScanTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Form(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "基本資料",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 36,
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.person),
                label: Text("姓名"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.numbers),
                label: Text("學號"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.email),
                label: Text("email"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.home),
                label: Text("地址"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.phone),
                label: Text("電話"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.contact_emergency),
                label: Text("身分證字號"),
              ),
            ),
            const SizedBox(height: 40),
            const Text(
              "保險資訊",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 36,
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_align_left),
                label: Text("事故原因"),
              ),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<AccidentType>(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.type_specimen),
                label: Text("事故類別"),
              ),
              borderRadius: BorderRadius.circular(4),
              items: AccidentType.values
                  .map((e) => DropdownMenuItem(
                        value: e,
                        child: Text(e.label),
                      ))
                  .toList(),
              onChanged: (selected) {},
              onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
            ),
            const SizedBox(height: 20),
            DateTimeFormField(
              context: context,
              controller: _accidentDateTextController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.calendar_month),
                label: Text("事故發生日期"),
              ),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<AccidentLocation>(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.location_on),
                label: Text("事故發生地點"),
              ),
              borderRadius: BorderRadius.circular(4),
              items: AccidentLocation.values
                  .map((e) => DropdownMenuItem(
                        value: e,
                        child: Text(e.label),
                      ))
                  .toList(),
              onChanged: (selected) {},
              onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<ClaimType>(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.type_specimen),
                label: Text("事故類型"),
              ),
              borderRadius: BorderRadius.circular(4),
              items: ClaimType.values
                  .map((e) => DropdownMenuItem(
                        value: e,
                        child: Text(e.label),
                      ))
                  .toList(),
              onChanged: (selected) {},
              onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.numbers),
                label: Text("Apply Amount"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.numbers),
                label: Text("Claim Amount"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_align_left),
                label: Text("Receipt"),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_align_left),
                label: Text("Certificate"),
              ),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<bool>(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.check_box),
                label: Text("存摺"),
              ),
              borderRadius: BorderRadius.circular(4),
              items: const [
                DropdownMenuItem(value: true, child: Text("是")),
                DropdownMenuItem(value: false, child: Text("否")),
              ],
              onChanged: (selected) {},
              onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<bool>(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.check_box),
                label: Text("X-ray"),
              ),
              borderRadius: BorderRadius.circular(4),
              items: const [
                DropdownMenuItem(value: true, child: Text("是")),
                DropdownMenuItem(value: false, child: Text("否")),
              ],
              onChanged: (selected) {},
              onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_align_left),
                label: Text("填表者"),
              ),
            ),
            const SizedBox(height: 20),
            DateTimeFormField(
              context: context,
              controller: _claimDateTextController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.calendar_month),
                label: Text("申請日期"),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _applicationScanTextController,
                    readOnly: true,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      icon: Icon(Icons.document_scanner),
                      label: Text("掃描文件"),
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
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
                    _applicationScanTextController.text = name;
                    // await value.uploadAttachment(blob, name);
                  },
                  icon: const Icon(Icons.upload),
                  label: const Text("上傳文件"),
                ),
              ],
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_align_left),
                label: Text("備註"),
              ),
            ),
            const SizedBox(height: 40),

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
                      builder: (context) => const DeleteDialog(),
                    );
                    // if (context.mounted && reply == true) {
                    //   await context.read<PostEditPageViewModel>().delete();
                    //   if (context.mounted) {
                    //     context.pushReplacement(Routes.postList.path);
                    //   }
                    // }
                    if (!context.mounted) return;
                    context.go(Routes.insuranceList.path);
                  },
                  icon: const Icon(Icons.delete),
                  label: const Text("刪除", style: TextStyle(fontSize: 16)),
                ),

                // 取消按鈕
                const SizedBox(width: 20),
                OutlinedButton.icon(
                  style: OutlinedButtonStyle.rRectStyle(),
                  onPressed: () => context.go(Routes.insuranceList.path),
                  icon: const Icon(Icons.cancel),
                  label: const Text("取消", style: TextStyle(fontSize: 16)),
                ),

                // 儲存按鈕
                const SizedBox(width: 20),
                OutlinedButton.icon(
                  style: OutlinedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    context.go(Routes.insuranceList.path);
                  },
                  icon: const Icon(Icons.save),
                  label: const Text("保存變更", style: TextStyle(fontSize: 16)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
