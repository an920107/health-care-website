import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/flutter_quill_extensions.dart';
import 'package:flutter_quill_extensions/services/image_picker/image_picker.dart';
import 'package:flutter_quill_extensions/services/image_picker/s_image_picker.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/model/post/attachment_info.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:health_care_website/view_model/private/post_editor_page_view_model.dart';
import 'package:provider/provider.dart';

class PostEditorPage extends StatefulWidget {
  const PostEditorPage(
    this.id, {
    super.key,
  });

  final String id;

  @override
  State<PostEditorPage> createState() => _PostEditorPageState();
}

class _PostEditorPageState extends State<PostEditorPage> {
  final _quillController = QuillController(
    document: Document(),
    selection: const TextSelection.collapsed(offset: 0),
    keepStyleOnNewLine: false,
  );
  final _titleTextController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context
          .read<PostEditorPageViewModel>()
          .fetchFromServer(widget.id)
          .then((value) {
        _titleTextController.text = value!.title;
        _quillController.document = Document.fromJson(
          json.decode(value.content),
        );
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: LayoutBuilder(builder: (context, constrain) {
        return Consumer<PostEditorPageViewModel>(
          builder: (context, value, child) => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  // 標題輸入框
                  Expanded(
                    flex: 2,
                    child: TextField(
                      maxLines: 1,
                      controller: _titleTextController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        icon: Icon(Icons.title),
                        label: Text("標題"),
                      ),
                    ),
                  ),
                  const SizedBox(width: 40),

                  // 類別選取框
                  Expanded(
                    flex: 1,
                    child: DropdownButtonFormField<PostColumn>(
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        icon: Icon(Icons.type_specimen),
                        label: Text("類別"),
                      ),
                      items: PostColumn.values
                          .map((e) => DropdownMenuItem(
                                value: e,
                                child: Text(e.label),
                              ))
                          .toList(),
                      onChanged: (selected) {
                        FocusScope.of(context).requestFocus(FocusNode());
                        if (selected == null) return;
                        value.selectedPostColumn = selected;
                      },
                      value: value.selectedPostColumn,
                    ),
                  ),

                  // 發布/轉為草稿
                  const SizedBox(width: 40),
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

              // 編輯器本體
              const SizedBox(height: 20),
              _buildTextEditor(),

              // 附件預覽
              if (value.attachments.isNotEmpty) const SizedBox(height: 20),
              GridView.count(
                shrinkWrap: true,
                crossAxisCount: 5,
                mainAxisSpacing: 20,
                crossAxisSpacing: 20,
                childAspectRatio: 3,
                children: value.attachments
                    .map((e) => _buildAttachmentPreview(e))
                    .toList(),
              ),

              // 功能按鈕們
              const SizedBox(height: 20),
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
                    onPressed: () =>
                        context.pushReplacement(Routes.postList.path),
                    icon: const Icon(Icons.cancel),
                    label: const Text("取消", style: TextStyle(fontSize: 16)),
                  ),

                  // 上傳附件按鈕
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: OutlinedButtonStyle.rRectStyle(),
                    onPressed: () async {
                      final result = await FilePicker.platform.pickFiles();
                      if (result == null) return;
                      final blob = result.files.single.bytes;
                      final name = result.files.single.name;
                      if (blob == null) return;
                      await value.uploadAttachment(blob, name);
                    },
                    icon: const Icon(Icons.upload_file_rounded),
                    label: const Text("上傳附件", style: TextStyle(fontSize: 16)),
                  ),

                  // 發布/轉為草稿
                  // const SizedBox(width: 20),
                  // OutlinedButton.icon(
                  //   style: OutlinedButtonStyle.rRectStyle(),
                  //   onPressed: () => value.toggleVisible(),
                  //   icon: Icon(
                  //       value.visible ? Icons.edit_document : Icons.visibility),
                  //   label: Text(
                  //     value.visible ? "轉為草稿" : "公開發佈",
                  //     style: const TextStyle(fontSize: 16),
                  //   ),
                  // ),

                  // 儲存按鈕
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: OutlinedButtonStyle.rRectStyle(),
                    onPressed: () async {
                      value.uploadPost(
                        title: _titleTextController.text,
                        content: json.encode(
                            _quillController.document.toDelta().toJson()),
                      );
                      if (context.mounted) {
                        context.pushReplacement(Routes.postList.path);
                      }
                    },
                    icon: const Icon(Icons.save),
                    label: const Text("保存變更", style: TextStyle(fontSize: 16)),
                  ),
                ],
              ),
            ],
          ),
        );
      }),
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

  Widget _buildAttachmentPreview(AttachmentInfo info) {
    return Card(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Expanded(
            flex: 1,
            child: Icon(Icons.file_present_rounded),
          ),
          Expanded(
            flex: 3,
            child: Text(
              info.name,
              overflow: TextOverflow.fade,
              softWrap: false,
            ),
          ),
          Expanded(
            flex: 1,
            child: IconButton(
              onPressed: () => context
                  .read<PostEditorPageViewModel>()
                  .removeAttachment(info.id),
              icon: const Icon(Icons.cancel_outlined),
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
          .read<PostEditorPageViewModel>()
          .uploadImage(await file.readAsBytes(), file.name);
    } else {
      url = "";
    }
    return url;
  }
}
