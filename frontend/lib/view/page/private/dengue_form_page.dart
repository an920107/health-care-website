import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/datetime_form_field.dart';
import 'package:health_care_website/view_model/private/dengue_form_page_view_model.dart';
import 'package:provider/provider.dart';

class DengueFormPage extends StatefulWidget {
  const DengueFormPage({super.key});

  @override
  State<DengueFormPage> createState() => _DengueFormPageState();
}

class _DengueFormPageState extends State<DengueFormPage> {
  final _inspectDateTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<DengueFormPageViewModel>(
        builder: (context, value, child) => Form(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 基本資訊
              const Text(
                "基本資訊",
                softWrap: true,
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              DateTimeFormField(
                controller: _inspectDateTextController,
                context: context,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  icon: Icon(Icons.calendar_month),
                  label: Text("檢查日期"),
                ),
              ),
              const SizedBox(height: 20),
              DropdownButtonFormField<int>(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  icon: Icon(Icons.location_pin),
                  label: Text("檢查地點"),
                ),
                items: value.buildings.entries
                    .map((e) => DropdownMenuItem<int>(
                          value: e.key,
                          child: Text("${e.key}: ${e.value}"),
                        ))
                    .toList(),
                onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
                onChanged: (selected) {},
              ),
              const SizedBox(height: 40),
              // 一堆題目
              const Text(
                "您的住家屋外或周圍環境是否有下列容器",
                softWrap: true,
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              for (int i = 0; i < 25; i++)
                _buildQuestionWidget(
                  value.questions[i],
                  index: i,
                ),
              const SizedBox(height: 20),
              const Text(
                "您的住宅內是否有下列容器",
                softWrap: true,
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              for (int i = 25; i < value.questions.length; i++)
                _buildQuestionWidget(
                  value.questions[i],
                  index: i,
                ),
              const SizedBox(height: 20),
              // 功能按鈕們
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  // 取消按鈕
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: OutlinedButtonStyle.rRectStyle(),
                    onPressed: () => context.go(Routes.root.path),
                    icon: const Icon(Icons.cancel),
                    label: const Text("取消", style: TextStyle(fontSize: 16)),
                  ),

                  // 送出
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: OutlinedButtonStyle.rRectStyle(),
                    onPressed: () async {
                      if (value.checkQuestionsFilled().isNotEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("請確認填寫所有的問題")),
                        );
                        return;
                      }
                      await value.upload("", DateTime.parse(_inspectDateTextController.text));
                      if (!context.mounted) return;
                      context.go(Routes.root.path);
                    },
                    icon: const Icon(Icons.send),
                    label: const Text("送出", style: TextStyle(fontSize: 16)),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuestionWidget(
    DengueFormQuestion question, {
    required int index,
    int layer = 0,
  }) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                "${layer == 0 ? "${index + 1}." : "${"\t" * layer * 4}• "} ${question.title}",
                softWrap: true,
                style: TextStyle(
                    fontSize: 16,
                    color: context
                            .watch<DengueFormPageViewModel>()
                            .questionsNotFilled
                            .contains(index)
                        ? Colors.red
                        : null),
              ),
            ),
            ToggleButtons(
              renderBorder: true,
              borderRadius: BorderRadius.circular(4),
              onPressed: (buttonIndex) => context
                  .read<DengueFormPageViewModel>()
                  .toggleButtonsPressed(index, layer, buttonIndex),
              isSelected: question.selected,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Row(
                    children: [
                      const Icon(Icons.check),
                      const SizedBox(width: 5),
                      Text(question.type.trueLabel),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Row(
                    children: [
                      const Icon(Icons.close),
                      const SizedBox(width: 5),
                      Text(question.type.falseLabel),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
        if (question.selected[0] && question.subQuestion != null)
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 20),
              _buildQuestionWidget(
                question.subQuestion!,
                index: index,
                layer: layer + 1,
              ),
            ],
          )
        else
          const SizedBox(height: 20),
      ],
    );
  }
}
