import 'dart:convert';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/flutter_quill_extensions.dart';
import 'package:flutter_quill_extensions/services/image_picker/image_picker.dart';
import 'package:flutter_quill_extensions/services/image_picker/s_image_picker.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/model/post.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/base/base_scaffold.dart';
import 'package:health_care_website/view/dialog/post_delete_dialog.dart';
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
  var _selectedPostColumn = PostColumn.activity;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context
          .read<PostEditorPageViewModel>()
          .fetchFromServer(widget.id)
          .then((value) {
        _titleTextController.text = value!.title;
        _quillController.document =
            Document.fromJson(json.decode(value.content));
        setState(() => _selectedPostColumn = value.column);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constrain) => BaseScaffold(
        body: Consumer<PostEditorPageViewModel>(
          builder: (context, value, child) => Column(
            children: [
              Row(
                children: [
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
                  const SizedBox(width: 50),
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
                        setState(() => _selectedPostColumn = selected);
                      },
                      value: _selectedPostColumn,
                    ),
                  )
                ],
              ),
              const SizedBox(height: 20),
              _buildTextEditor(),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  OutlinedButton.icon(
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                      padding: const EdgeInsets.all(20),
                    ),
                    onPressed: () async {
                      await showDialog(
                        context: context,
                        builder: (context) => const PostDeleteDialog(),
                      );
                    },
                    icon: const Icon(Icons.delete),
                    label: const Text("刪除", style: TextStyle(fontSize: 16)),
                  ),
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                      padding: const EdgeInsets.all(20),
                    ),
                    onPressed: () =>
                        context.pushReplacement(Routes.postList.path),
                    icon: const Icon(Icons.cancel),
                    label: const Text("取消", style: TextStyle(fontSize: 16)),
                  ),
                  const SizedBox(width: 20),
                  OutlinedButton.icon(
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                      padding: const EdgeInsets.all(20),
                    ),
                    onPressed: () async {
                      value.uploadPost(
                          title: _titleTextController.text,
                          column: _selectedPostColumn,
                          content: json.encode(
                              _quillController.document.toDelta().toJson()),
                          visible: false);
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
                maxHeight: MediaQuery.of(context).size.height / 1.8),
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
          .read<PostEditorPageViewModel>()
          .uploadAttachment(await file.readAsBytes(), file.name);
    } else {
      url = "";
    }
    return url;
  }
}
