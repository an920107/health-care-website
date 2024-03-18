import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/flutter_quill_embeds.dart';
import 'package:health_care_website/model/post/post.dart';
import 'package:health_care_website/view/widget/attachment_preview.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/public/post_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class PostPage extends StatefulWidget {
  const PostPage(this.id, {super.key});

  final String id;

  @override
  State<PostPage> createState() => _PostPageState();
}

class _PostPageState extends State<PostPage> {
  late Future<Post?> Function(String) _fetchFutureCallback;

  final _quillController = QuillController(
    document: Document(),
    selection: const TextSelection.collapsed(offset: 0),
    keepStyleOnNewLine: false,
  );

  @override
  void initState() {
    super.initState();
    _fetchFutureCallback = context.read<PostPageViewModel>().fetchFromServer;
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: FutureBuilder(
        future: _fetchFutureCallback(widget.id).then((value) {
          _quillController.document = Document.fromJson(
            json.decode(value!.content),
          );
        }),
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const LoadingCircle();
          }

          return LayoutBuilder(builder: (context, constraints) {
            final platform = context.read<PlatformViewModel>().platform;

            return Consumer<PostPageViewModel>(
              builder: (context, value, child) {
                final post = value.post!;
                return Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // 標題
                    if (platform != Platform.mobile)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            post.title,
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: const Icon(Icons.access_time),
                            child: Text(
                              DateFormat("yyyy-MM-dd").format(post.updateTime),
                            ),
                          ),
                        ],
                      ),
                    if (platform == Platform.mobile)
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            post.title,
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: const Icon(Icons.access_time),
                            child: Text(
                              DateFormat("yyyy-MM-dd").format(post.updateTime),
                            ),
                          ),
                        ],
                      ),
                    const Divider(),
                    QuillEditor.basic(
                      configurations: QuillEditorConfigurations(
                        controller: _quillController,
                        readOnly: true,
                        scrollable: false,
                        expands: false,
                        showCursor: false,
                        embedBuilders: kIsWeb
                            ? FlutterQuillEmbeds.editorWebBuilders()
                            : FlutterQuillEmbeds.editorBuilders(),
                      ),
                    ),

                    if (value.attachments.isNotEmpty)
                      const SizedBox(height: 50),
                    if (value.attachments.isNotEmpty) const Divider(height: 20),
                    LayoutBuilder(builder: (context, constraints) {
                      final crossAxisCount = platform == Platform.computer
                          ? 4
                          : (platform == Platform.tablet ? 3 : 1);
                      return GridView.count(
                        shrinkWrap: true,
                        crossAxisCount: crossAxisCount,
                        mainAxisSpacing: 20,
                        crossAxisSpacing: 20,
                        childAspectRatio:
                            (constraints.maxWidth - (crossAxisCount - 1) * 20) /
                                (crossAxisCount * 60),
                        children: value.attachments
                            .map((e) => AttachmentPreview(info: e))
                            .toList(),
                      );
                    }),
                  ],
                );
              },
            );
          });
        },
      ),
    );
  }
}
