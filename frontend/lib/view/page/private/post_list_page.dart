import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view_model/private/post_list_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class PostListPage extends StatefulWidget {
  const PostListPage({super.key});

  @override
  State<PostListPage> createState() => _PostListPageState();
}

class _PostListPageState extends State<PostListPage> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    context.read<PostListPageViewModel>().updatePostList();
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<PostListPageViewModel>(
        builder: (context, value, child) => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    final post = await value.createNewPost();
                    if (post == null) return;
                    await value.updatePostList();
                    if (context.mounted) {
                      context.push("${Routes.postEdit.path}/${post.id}");
                    }
                  },
                  icon: const Icon(Icons.add),
                  label: const Text("新增文章"),
                )
              ],
            ),
            Row(
              children: [
                Expanded(
                  child: DataTable(
                    headingTextStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                    columns: const [
                      DataColumn(label: Text("標題")),
                      DataColumn(label: Text("類別")),
                      DataColumn(label: Text("上次更新日期")),
                      DataColumn(label: Text("設為重要")),
                      DataColumn(label: Text("發布狀態")),
                      DataColumn(label: Text("編輯")),
                    ],
                    rows: [
                      for (var post in value.posts)
                        DataRow(cells: [
                          DataCell(Text(post.title)),
                          DataCell(Text(post.column.label)),
                          DataCell(Text(DateFormat("yyyy-MM-dd")
                              .format(post.updateTime))),
                          DataCell(Checkbox(
                            value: post.important,
                            onChanged: (checked) => value.togglePostImportant(post),
                          )),
                          DataCell(IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: Icon(post.visible
                                ? Icons.domain_verification_rounded
                                : Icons.edit_document),
                            child: Text(post.visible ? "已發佈" : "草稿"),
                          )),
                          DataCell(IconButton(
                            onPressed: () {
                              context.push("${Routes.postEdit.path}/${post.id}");
                            },
                            icon: const Icon(Icons.edit),
                          )),
                        ])
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
