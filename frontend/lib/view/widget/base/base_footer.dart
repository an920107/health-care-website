import 'package:flutter/material.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:provider/provider.dart';

class BaseFooter extends StatelessWidget {
  const BaseFooter({super.key});

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
              ? const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
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
                        // TODO
                        Text("【瀏覽人次 0 人】"),
                        Text("【隱私權政策聲明】"),
                        Text("版權所有 © 國立中央大學衛生保健組"),
                        Text("National Central University - Health Center"),
                      ],
                    ),
                  ],
                )
              : const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("電話：03-4227151#57270、03-2804814"),
                        Text("傳真：03-4272405"),
                        Text("Email：ncu7270@ncu.edu.tw"),
                        Text("地址：320 桃園市中壢區中大路 300 號 中正圖書館 1 樓"),
                        Text(""),
                        Text("【瀏覽人次 0 人】"),
                        Text("【隱私權政策聲明】"),
                        Text(""),
                        Text("版權所有 © 國立中央大學衛生保健組"),
                        Text("National Central University - Health Center"),
                      ],
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}
