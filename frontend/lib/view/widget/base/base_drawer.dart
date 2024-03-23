import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:url_launcher/url_launcher_string.dart';

class BaseDrawer extends StatefulWidget {
  const BaseDrawer({super.key});

  @override
  State<BaseDrawer> createState() => _BaseDrawerState();
}

class _BaseDrawerState extends State<BaseDrawer> {
  final _menu = PageTopic.asMap();

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Padding(
              padding: EdgeInsets.only(top: 60),
              child: ListTile(
                title: Text(
                  "選單",
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const Divider(),
            Expanded(
              child: ListView(
                shrinkWrap: true,
                children: [
                  for (var group in _menu.entries)
                    Theme(
                      data: Theme.of(context)
                          .copyWith(dividerColor: Colors.transparent),
                      child: ExpansionTile(
                        title: Text(
                          group.key.label,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        children: [
                          for (var link in group.value)
                            ListTile(
                              onTap: () {},
                              title: Text(link.label),
                            ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            const Divider(),
            Column(
              children: [
                ListTile(
                  onTap: () => launchUrlString(Config.ncuHome),
                  leading: const Icon(Icons.home),
                  title: const Text(
                    "中大首頁",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                ListTile(
                  onTap: () async {
                    await showDialog(
                      context: context,
                      builder: (context) => const AlertDialog(
                        title: Text("Sorry!"),
                        content: Text("This feature is not available yet."),
                      ),
                    );
                  },
                  leading: const Icon(Icons.language),
                  title: const Text(
                    "English",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                ListTile(
                  title: Row(
                    children: [
                      // IconButton.outlined(
                      //   onPressed: () async {
                      //     await Clipboard.setData(
                      //       ClipboardData(text: Config.email),
                      //     );
                      //     if (context.mounted) {
                      //       Scaffold.of(context).closeDrawer();
                      //       ScaffoldMessenger.of(context).showSnackBar(
                      //         const SnackBar(content: Text("電子郵件已複製到剪貼簿")),
                      //       );
                      //     }
                      //   },
                      //   icon: const Icon(Icons.email),
                      // ),
                      IconButton.outlined(
                        onPressed: () => launchUrlString(Config.instagram),
                        icon: const Icon(FontAwesomeIcons.instagram),
                      ),
                      IconButton.outlined(
                        onPressed: () => launchUrlString(Config.facebook),
                        icon: const Icon(FontAwesomeIcons.facebook),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
