mixin class TitleValidator {
  String? titleValidator(String? text, [int maxLength = 25]) {
    if (text == null) return "標題不可為空";
    text = text.trim();
    if (text.isEmpty) return "標題不可為空";
    if (text.length > 25) return "標題不可超過 25 字";
    return null;
  }
}