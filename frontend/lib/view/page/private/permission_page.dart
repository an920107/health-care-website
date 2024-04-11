import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:health_care_website/enum/user_role.dart';
import 'package:health_care_website/model/user/user.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/private/permission_page_view_model.dart';
import 'package:provider/provider.dart';

class PermissionPage extends StatefulWidget {
  const PermissionPage({super.key});

  @override
  State<PermissionPage> createState() => _PermissionPageState();
}

class _PermissionPageState extends State<PermissionPage> {
  late Future<List<User>> Function() _future;

  @override
  void initState() {
    super.initState();
    _future = context.read<PermissionPageViewModel>().fetchFromServer;
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: FutureBuilder(
        future: _future(),
        builder: (context, snapshot) {
          // Loading 圈圈
          if (snapshot.connectionState != ConnectionState.done) {
            return const LoadingCircle();
          }

          return Consumer<PermissionPageViewModel>(
            builder: (context, value, child) => Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: DataTable(
                        headingTextStyle: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                        columns: const [
                          DataColumn(label: Text("姓名")),
                          DataColumn(label: Text("UID")),
                          DataColumn(label: Text("編輯（立即生效）")),
                          DataColumn(label: Text("刪除（立即生效）")),
                        ],
                        rows: [
                          for (var user in value.users)
                            DataRow(cells: [
                              DataCell(Text(user.name)),
                              DataCell(Text(user.id)),
                              DataCell(DropdownButton<UserRole>(
                                items: UserRole.values
                                    .map((e) => DropdownMenuItem(
                                          value: e,
                                          child: Text(e.name),
                                        ))
                                    .toList(),
                                value: user.role,
                                onChanged: (selected) async => value.updatePermission(user, selected),
                                onTap: () => FocusScope.of(context)
                                    .requestFocus(FocusNode()),
                              )),
                              DataCell(IconButton(
                                onPressed: () async => value.deleteUser(user),
                                icon: const Icon(
                                  Icons.delete_forever,
                                  color: Colors.red,
                                ),
                              )),
                            ]),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
