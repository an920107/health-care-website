import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/flutter_quill_embeds.dart';
import 'package:health_care_website/model/static_page/static_page.dart';
import 'package:health_care_website/view/widget/attachment_preview.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/public/static_page_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class StaticPagePage extends StatefulWidget {
  const StaticPagePage(this.id, {super.key});

  final String id;

  @override
  State<StaticPagePage> createState() => _StaticPagePageState();
}

class _StaticPagePageState extends State<StaticPagePage> {
  late Future<StaticPage?> Function(String) _fetchFutureCallback;

  final _quillController = QuillController(
    document: Document(),
    selection: const TextSelection.collapsed(offset: 0),
    keepStyleOnNewLine: false,
    readOnly: true,
  );

  @override
  void initState() {
    super.initState();
    _fetchFutureCallback =
        context.read<StaticPagePageViewModel>().fetchFromServer;
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

            return Consumer<StaticPagePageViewModel>(
              builder: (context, value, child) {
                final page = value.page;
                if (page == null) {
                  return const LoadingCircle();
                }
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
                            value.topic.label,
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              IconText(
                                mainAxisSize: MainAxisSize.min,
                                icon: const Icon(Icons.access_time),
                                child: Text(
                                  DateFormat("yyyy-MM-dd")
                                      .format(page.updateTime),
                                ),
                              ),
                              const SizedBox(width: 20),
                              IconText(
                                mainAxisSize: MainAxisSize.min,
                                icon: const Icon(Icons.visibility),
                                child: Text(page.viewer.toString()),
                              ),
                            ],
                          ),
                        ],
                      ),
                    if (platform == Platform.mobile)
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            value.topic.label,
                            style: const TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 10),
                          IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: const Icon(Icons.access_time),
                            child: Text(
                              DateFormat("yyyy-MM-dd").format(page.updateTime),
                            ),
                          ),
                          IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: const Icon(Icons.visibility),
                            child: Text(page.viewer.toString()),
                          ),
                        ],
                      ),
                    const Divider(),
                    QuillEditor.basic(
                      configurations: QuillEditorConfigurations(
                        controller: _quillController,
                        disableClipboard: true,
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
