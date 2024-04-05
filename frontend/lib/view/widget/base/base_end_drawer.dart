import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view_model/auth_view_model.dart';
import 'package:provider/provider.dart';

class BaseEndDrawer extends StatelessWidget {
  const BaseEndDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: ListView(
          children: [
            Consumer<AuthViewModel>(
              builder: (context, value, child) => UserAccountsDrawerHeader(
                accountName: Text(value.name),
                accountEmail: Text(value.id),
                currentAccountPicture: ClipOval(
                  child: Container(
                    color: Colors.amber,
                    child: Icon(
                      Icons.person,
                      size: 48,
                      color: Colors.grey.shade800,
                    ),
                  ),
                ),
              ),
            ),
            ListTile(
              onTap: () => context.push(Routes.carousel.path),
              title: const Text("首頁橫幅圖片"),
            ),
            ListTile(
              onTap: () => context.push(Routes.pageEdit.path),
              title: const Text("靜態頁面"),
            ),
            ListTile(
              onTap: () => context.push(Routes.postList.path),
              title: const Text("文章公告"),
            ),
            ListTile(
              onTap: () => context.push(Routes.restaurantList.path),
              title: const Text("商家檢查"),
            ),
            const Divider(),
            ListTile(
              onTap: () {
                Scaffold.of(context).closeEndDrawer();
                context.push(Routes.logout.path);
              },
              title: const Text("登出"),
            ),
          ],
        ),
      ),
    );
  }
}
