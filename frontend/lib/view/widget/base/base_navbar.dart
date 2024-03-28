import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/enum/page_topic.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher_string.dart';

class BaseNavbar extends StatelessWidget {
  const BaseNavbar({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constrain) {
        final platform = context.read<PlatformViewModel>().platform;

        return Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // 外部連結 navbar
            if (platform != Platform.mobile)
              Container(
                color: Colors.amber,
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () => context.go(Routes.root.path),
                      icon: const Icon(Icons.home),
                      label: const Text("首頁"),
                    ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () => launchUrlString(Config.ncuHome),
                      icon: const Icon(Icons.home_outlined),
                      label: const Text("中大首頁"),
                    ),
                    // TextButton.icon(
                    //   style: TextButton.styleFrom(
                    //     foregroundColor: Colors.grey.shade800,
                    //   ),
                    //   onPressed: () async {
                    //     await Clipboard.setData(
                    //         ClipboardData(text: Config.email));
                    //     if (context.mounted) {
                    //       ScaffoldMessenger.of(context).showSnackBar(
                    //         SnackBar(
                    //           margin: EdgeInsets.only(
                    //             left: MediaQuery.of(context).size.width - 400,
                    //             bottom: 20,
                    //             right: 20,
                    //           ),
                    //           behavior: SnackBarBehavior.floating,
                    //           content: const Text("電子郵件已複製到剪貼簿"),
                    //         ),
                    //       );
                    //     }
                    //   },
                    //   icon: const Icon(Icons.email),
                    //   label: const Text("聯絡我們"),
                    // ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () async {
                        await showDialog(
                          context: context,
                          builder: (context) => const AlertDialog(
                            title: Text("Sorry!"),
                            content: Text("This feature is not available yet."),
                          ),
                        );
                      },
                      icon: const Icon(Icons.language),
                      label: const Text("English"),
                    ),
                    IconButton(
                      onPressed: () => launchUrlString(Config.instagram),
                      icon: const Icon(FontAwesomeIcons.instagram),
                    ),
                    IconButton(
                      onPressed: () => launchUrlString(Config.facebook),
                      icon: const Icon(FontAwesomeIcons.facebook),
                    ),
                  ],
                ),
              ),

            // 站內 navbar
            Consumer<PlatformViewModel>(
              builder: (context, value, child) => Padding(
                padding: EdgeInsets.symmetric(horizontal: value.sidePadding),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 120),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      // 漢堡條
                      if (platform == Platform.mobile)
                        IconButton.filledTonal(
                          onPressed: () {
                            Scaffold.of(context).openDrawer();
                          },
                          icon: const Icon(Icons.menu),
                        ),

                      Expanded(
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: platform == Platform.mobile
                              ? MainAxisAlignment.center
                              : MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            // Logo & 網站名稱
                            CleanButton(
                              onPressed: () => context.go(Routes.root.path),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Image.asset("assets/logo.png"),
                                  const Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        "衛生保健組",
                                        style: TextStyle(
                                          fontSize: 24,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        "Health Center",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),

                            // 內部連結
                            if (platform != Platform.mobile)
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TextButton(
                                      onPressed: () => context.push(
                                          "${Routes.page.path}/${PageTopic.workteam.id}"),
                                      child: const Text("關於我們")),
                                  TextButton(
                                      onPressed: () => context.push(
                                          "${Routes.page.path}/${PageTopic.aed.id}"),
                                      child: const Text("校園 AED")),
                                  TextButton(
                                      onPressed: () {},
                                      child: const Text("登革熱填報")),
                                  TextButton(
                                      onPressed: () {},
                                      child: const Text("相關法規")),
                                  TextButton(
                                      onPressed: () {},
                                      child: const Text("下載專區")),
                                ],
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
