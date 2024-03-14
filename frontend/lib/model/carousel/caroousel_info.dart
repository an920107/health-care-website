class CarouselInfo {
  String id;
  String endpoint;
  String filename;

  CarouselInfo({
    required this.id,
    required this.endpoint,
    required this.filename,
  });

  factory CarouselInfo.fromJson(Map<String, dynamic> json) => CarouselInfo(
        id: json["id"],
        endpoint: json["endpoint"],
        filename: json["name"],
      );
}
