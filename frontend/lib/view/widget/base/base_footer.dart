import 'package:flutter/material.dart';
import 'package:health_care_website/router/routes.dart';
import 'package:health_care_website/view/widget/link_text.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/public/footer_view_model.dart';
import 'package:provider/provider.dart';

class BaseFooter extends StatefulWidget {
  const BaseFooter({super.key});

  @override
  State<BaseFooter> createState() => _BaseFooterState();
}

class _BaseFooterState extends State<BaseFooter> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<FooterViewModel>().fetchFromServer();
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constrain) => Consumer<PlatformViewModel>(
        builder: (context, value, child) => Container(
          padding: EdgeInsets.symmetric(
            vertical: 20,
            horizontal: value.sidePadding,
          ),
          color: Colors.amber,
          child: value.platform != Platform.mobile
              ? Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    const Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("電話：03-4227151#57270、03-2804814"),
                        Text("傳真：03-4272405"),
                        Text("Email：ncu7270@ncu.edu.tw"),
                        Text("地址：320 桃園市中壢區中大路 300 號 中正圖書館 1 樓"),
                      ],
                    ),
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("【瀏覽人次 ${context.watch<FooterViewModel>().totalViewer} 人】"),
                        LinkText(
                          path: Routes.privacy.path,
                          label: "【隱私權政策聲明】",
                        ),
                        const Text("版權所有 © 國立中央大學衛生保健組"),
                        const Text("National Central University - Health Center"),
                      ],
                    ),
                  ],
                )
              : Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("電話：03-4227151#57270、03-2804814"),
                        const Text("傳真：03-4272405"),
                        const Text("Email：ncu7270@ncu.edu.tw"),
                        const Text("地址：320 桃園市中壢區中大路 300 號 中正圖書館 1 樓"),
                        const Text(""),
                        Text("【瀏覽人次 ${context.watch<FooterViewModel>().totalViewer} 人】"),
                        LinkText(
                          path: Routes.privacy.path,
                          label: "【隱私權政策聲明】",
                        ),
                        const Text(""),
                        const Text("版權所有 © 國立中央大學衛生保健組"),
                        const Text(
                            "National Central University - Health Center"),
                      ],
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}
