enum RestaurantInspectionItem {
  water("飲用水"),
  food("熟食"),
  drink("飲料"),
  ice("冰塊"),
  others("其他");

  final String label;

  const RestaurantInspectionItem(this.label);
}