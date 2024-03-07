import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:provider/provider.dart';

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
                      onPressed: () {},
                      icon: const Icon(Icons.home),
                      label: const Text("首頁"),
                    ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () {},
                      icon: const Icon(Icons.home_outlined),
                      label: const Text("中大首頁"),
                    ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () {},
                      icon: const Icon(Icons.email),
                      label: const Text("聯絡我們"),
                    ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.grey.shade800,
                      ),
                      onPressed: () {},
                      icon: const Icon(Icons.language),
                      label: const Text("English"),
                    ),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.instagram),
                    ),
                    IconButton(
                      onPressed: () {},
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
                            Row(
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
                        
                            // 內部連結
                            if (platform != Platform.mobile)
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TextButton(
                                      onPressed: () {},
                                      child: const Text("關於我們")),
                                  TextButton(
                                      onPressed: () {},
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
