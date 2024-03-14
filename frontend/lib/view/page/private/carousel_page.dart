import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/_internal/file_picker_web.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:health_care_website/config.dart';
import 'package:health_care_website/view/theme/button_style.dart';
import 'package:health_care_website/view/widget/base/base_scaffold.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:health_care_website/view/widget/dialog/post_delete_dialog.dart';
import 'package:health_care_website/view/widget/hoverable_widget.dart';
import 'package:health_care_website/view_model/private/carousel_page_view_model.dart';
import 'package:provider/provider.dart';

class CarouselPage extends StatefulWidget {
  const CarouselPage({super.key});

  @override
  State<CarouselPage> createState() => _CarouselPageState();
}

class _CarouselPageState extends State<CarouselPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      context.read<CarouselPageViewModel>().fetchFromServer();
    });
  }

  @override
  Widget build(BuildContext context) {
    return BaseScaffold(
      body: Consumer<CarouselPageViewModel>(
        builder: (context, value, child) => Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                ElevatedButton.icon(
                  style: ElevatedButtonStyle.rRectStyle(),
                  onPressed: () async {
                    final result = await FilePickerWeb.platform.pickFiles(
                      type: FileType.custom,
                      allowedExtensions: [
                        "jpg",
                        "jpeg",
                        "png",
                      ],
                    );
                    if (result == null) return;
                    final blob = result.files.single.bytes;
                    final name = result.files.single.name;
                    if (blob == null) return;
                    await value.uploadImage(blob, name);
                    await value.fetchFromServer();
                  },
                  icon: const Icon(Icons.upload),
                  label: const Text("上傳新圖片"),
                ),
              ],
            ),
            const SizedBox(height: 20),
            GridView.count(
              crossAxisCount: 3,
              childAspectRatio: 16 / 9,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              shrinkWrap: true,
              children: [
                for (var image in value.images)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: HoverableWidget(
                      showOnHovered: Positioned(
                        right: 5,
                        top: 5,
                        child: CleanButton(
                          onPressed: () async {
                            final reply = await showDialog(
                              context: context,
                              builder: (context) => const DeleteDialog(),
                            );
                            if (context.mounted && reply == true) {
                              await value.deleteImage(image);
                              await value.fetchFromServer();
                            }
                          },
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(3),
                            child: Container(
                              color: Colors.grey.shade300,
                              child: Icon(
                                Icons.delete,
                                color: Colors.red.shade600,
                              ),
                            ),
                          ),
                        ),
                      ),
                      child: CachedNetworkImage(
                        imageUrl: Uri.decodeComponent(
                          Uri.https(Config.backend, image.endpoint).toString(),
                        ),
                        fit: BoxFit.cover,
                        placeholder: (context, url) =>
                            const Center(child: CircularProgressIndicator()),
                      ),
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
