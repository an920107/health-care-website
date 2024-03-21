import 'package:flutter/material.dart';
import 'package:health_care_website/model/restaurant/restaurant.dart';
import 'package:health_care_website/view/widget/attachment_preview.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/icon_text.dart';
import 'package:health_care_website/view/widget/loading_circle.dart';
import 'package:health_care_website/view_model/platform_view_model.dart';
import 'package:health_care_website/view_model/public/restaurant_page_view_model.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class RestaurantPage extends StatefulWidget {
  const RestaurantPage(
    this.id, {
    super.key,
  });

  final String id;

  @override
  State<RestaurantPage> createState() => _RestaurantPageState();
}

class _RestaurantPageState extends State<RestaurantPage> {
  late Future<Restaurant?> Function(String) _fetchFutureCallback;

  @override
  void initState() {
    super.initState();
    _fetchFutureCallback =
        context.read<RestaurantPageViewModel>().fetchFromServer;
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: FutureBuilder(
        future: _fetchFutureCallback(widget.id),
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const LoadingCircle();
          }

          return LayoutBuilder(builder: (context, constraints) {
            final platform = context.read<PlatformViewModel>().platform;

            return Consumer<RestaurantPageViewModel>(
              builder: (context, value, child) {
                final restaurant = value.restaurant!;
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
                            restaurant.title,
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
                                      .format(restaurant.inspectTime),
                                ),
                              ),
                              const SizedBox(width: 20),
                              IconText(
                                mainAxisSize: MainAxisSize.min,
                                icon: const Icon(Icons.visibility),
                                child: Text(restaurant.viewer.toString()),
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
                            restaurant.title,
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
                              DateFormat("yyyy-MM-dd")
                                  .format(restaurant.inspectTime),
                            ),
                          ),
                          IconText(
                            mainAxisSize: MainAxisSize.min,
                            icon: const Icon(Icons.visibility),
                            child: Text(restaurant.viewer.toString()),
                          ),
                        ],
                      ),
                    const Divider(),

                    // 內容
                    Text("檢驗項目：${restaurant.item.label}"),
                    Text("通過：${restaurant.valid ? "是" : "否"}"),

                    // 附件
                    if (value.attachments.isNotEmpty)
                      const SizedBox(height: 50),
                    if (value.attachments.isNotEmpty) const Divider(height: 20),
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final crossAxisCount = platform == Platform.computer
                            ? 4
                            : (platform == Platform.tablet ? 3 : 1);
                        return GridView.count(
                          shrinkWrap: true,
                          crossAxisCount: crossAxisCount,
                          mainAxisSpacing: 20,
                          crossAxisSpacing: 20,
                          childAspectRatio: (constraints.maxWidth -
                                  (crossAxisCount - 1) * 20) /
                              (crossAxisCount * 60),
                          children: value.attachments
                              .map((e) => AttachmentPreview(info: e))
                              .toList(),
                        );
                      },
                    ),
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
