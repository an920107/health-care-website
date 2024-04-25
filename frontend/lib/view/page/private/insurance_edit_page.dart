import 'package:flutter/material.dart';
import 'package:health_care_website/model/insurance/insurance.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/datetime_form_field.dart';

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

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Form(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
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
                icon: Icon(Icons.type_specimen),
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
                icon: Icon(Icons.type_specimen),
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
                  onPressed: () async {},
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
          ],
        ),
      ),
    );
  }
}
