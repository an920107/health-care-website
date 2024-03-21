import 'dart:convert';

import 'package:file_picker/_internal/file_picker_web.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/embeds/image/editor/image_embed_types.dart';
import 'package:flutter_quill_extensions/flutter_quill_embeds.dart';
import 'package:flutter_quill_extensions/models/config/image/toolbar/image_configurations.dart';
import 'package:flutter_quill_extensions/services/image_picker/image_options.dart';
import 'package:flutter_quill_extensions/services/image_picker/s_image_picker.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/attachment_preview.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/private/static_page_edit_page_view_model.dart';
import 'package:provider/provider.dart';

class StaticPageEditPage extends StatefulWidget {
  const StaticPageEditPage({super.key});

  @override
  State<StaticPageEditPage> createState() => _StaticPageEditPageState();
}

class _StaticPageEditPageState extends State<StaticPageEditPage> {
  final _quillController = QuillController(
    document: Document(),
    selection: const TextSelection.collapsed(offset: 0),
    keepStyleOnNewLine: false,
  );

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<StaticPageEditPageViewModel>().fetchFromServer();
    });
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<StaticPageEditPageViewModel>(
        builder: (context, value, child) => FutureBuilder(
          future: value.fetchCompleter.future.then((value) {
            if (value != null) {
              _quillController.document = Document.fromJson(
                json.decode(value.content),
              );
            }
          }),
          builder: (context, snapshot) {
            // Loading 圈圈
            if (snapshot.connectionState != ConnectionState.done) {
              return const LoadingCircle();
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 選取類別
                DropdownButtonFormField<PageTopic>(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    icon: Icon(Icons.type_specimen),
                    label: Text("類別"),
                  ),
                  items: PageTopic.values
                      .map((e) => DropdownMenuItem(
                            value: e,
                            child: Text(e.label),
                          ))
                      .toList(),
                  onChanged: (selected) {
                    FocusScope.of(context).requestFocus(FocusNode());
                    if (selected == null) return;
                    value.selectedPageTopic = selected;
                  },
                  value: value.selectedPageTopic,
                ),

                // 編輯器本體
                const SizedBox(height: 20),
                _buildTextEditor(),

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
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    // 取消按鈕
                    const SizedBox(width: 20),
                    OutlinedButton.icon(
                      style: OutlinedButtonStyle.rRectStyle(),
                      onPressed: () {},
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
                      label: const Text("上傳附件", style: TextStyle(fontSize: 16)),
                    ),

                    // 儲存按鈕
                    const SizedBox(width: 20),
                    OutlinedButton.icon(
                      style: OutlinedButtonStyle.rRectStyle(),
                      onPressed: () async {
                        value.uploadPage(json.encode(
                            _quillController.document.toDelta().toJson()));
                      },
                      icon: const Icon(Icons.save),
                      label: const Text("保存變更", style: TextStyle(fontSize: 16)),
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildTextEditor() {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: Theme.of(context).primaryColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          QuillToolbar.simple(
            configurations: QuillSimpleToolbarConfigurations(
              controller: _quillController,
              toolbarIconAlignment: WrapAlignment.start,
              showUndo: false,
              showRedo: false,
              showSubscript: false,
              showSuperscript: false,
              showSearchButton: false,
              showInlineCode: false,
              showFontSize: false,
              showFontFamily: false,
              embedButtons: FlutterQuillEmbeds.toolbarButtons(
                videoButtonOptions: null,
                imageButtonOptions: QuillToolbarImageButtonOptions(
                  imageButtonConfigurations: QuillToolbarImageConfigurations(
                    onRequestPickImage: _uploadImage,
                  ),
                ),
              ),
            ),
          ),
          const Divider(height: 4),
          ConstrainedBox(
            constraints: BoxConstraints(
                maxHeight: MediaQuery.of(context).size.height / 2),
            child: QuillEditor.basic(
              configurations: QuillEditorConfigurations(
                controller: _quillController,
                readOnly: false,
                scrollable: true,
                expands: true,
                padding: const EdgeInsets.all(10),
                embedBuilders: kIsWeb
                    ? FlutterQuillEmbeds.editorWebBuilders()
                    : FlutterQuillEmbeds.editorBuilders(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<String?> _uploadImage(
      BuildContext context, ImagePickerService imagePickerService) async {
    final file =
        await imagePickerService.pickImage(source: ImageSource.gallery);

    // image wasn't selected
    if (file == null) return null;

    // image format error
    if (!["png", "jpg", "jpeg"]
        .contains(file.name.split(".").lastOrNull ?? "")) {
      return null;
    }

    // upload image and return url
    String url;
    if (context.mounted) {
      url = await context
          .read<StaticPageEditPageViewModel>()
          .uploadImage(await file.readAsBytes(), file.name);
    } else {
      url = "";
    }
    return url;
  }
}
