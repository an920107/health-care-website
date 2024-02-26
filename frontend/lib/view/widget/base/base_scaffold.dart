import 'package:flutter/material.dart';
import 'package:health_care_website/view/base/base_footer.dart';
import 'package:health_care_website/view/base/base_navbar.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:provider/provider.dart';

class BaseScaffold extends StatelessWidget {
  const BaseScaffold({
    super.key,
    this.body,
  });

  final Widget? body;

  @override
  Widget build(BuildContext context) {
    // 時時取得裝置寬度，並設定給 [PlatformViewModel]
    final size = MediaQuery.of(context).size;
    context.read<PlatformViewModel>().size = size;
    final sidePadding = context.read<PlatformViewModel>().sidePadding;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ConstrainedBox(
              constraints: BoxConstraints(minHeight: size.height),
              child: Column(
                children: [
                  const BaseNavbar(),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: sidePadding),
                    child: body ?? Container(),
                  ),
                ],
              ),
            ),
            const BaseFooter(),
          ],
        ),
      ),
    );
  }
}
