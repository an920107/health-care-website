import 'package:flutter/material.dart';
import 'package:health_care_website/model/blob/attachment_info.dart';
import 'package:health_care_website/view/widget/clean_button.dart';
import 'package:url_launcher/url_launcher.dart';

class AttachmentPreview extends StatelessWidget {
  const AttachmentPreview({
    super.key,
    this.removeCallback,
    required this.info,
  });

  final AttachmentInfo info;

  /// The remove button won't show if callback is null
  final void Function()? removeCallback;

  @override
  Widget build(BuildContext context) {
    return CleanButton(
      onPressed: () => launchUrl(info.url),
      child: Card(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Expanded(
              flex: 1,
              child: Icon(Icons.file_present_rounded),
            ),
            Expanded(
              flex: (removeCallback != null) ? 3 : 4,
              child: Text(
                info.name,
                overflow: TextOverflow.fade,
                softWrap: false,
              ),
            ),
            if (removeCallback != null)
              Flexible(
                flex: 1,
                child: IconButton(
                  onPressed: removeCallback,
                  icon: const Icon(Icons.cancel_outlined),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
