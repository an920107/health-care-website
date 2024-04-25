import 'package:flutter/material.dart';
import 'package:omni_datetime_picker/omni_datetime_picker.dart';

class DateTimeFormField extends TextFormField {
  DateTimeFormField({
    super.key,
    super.controller,
    super.decoration,
    required BuildContext context,
  }) : super(
          onTap: () async {
            FocusScope.of(context).requestFocus(FocusNode());
            if (controller == null) return;
            DateTime? date = await showOmniDateTimePicker(
              context: context,
              lastDate: DateTime.now(),
              type: OmniDateTimePickerType.date,
              initialDate: DateTime.tryParse(controller.text),
            );
            if (date == null) return;
            controller.text = date.toIso8601String().substring(0, 10);
          },
        );
}
