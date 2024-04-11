class CarouselInfo {
  String id;
  String uri;
  String filename;

  CarouselInfo({
    required this.id,
    required this.uri,
    required this.filename,
  });

  factory CarouselInfo.fromJson(Map<String, dynamic> json) => CarouselInfo(
        id: json["id"],
        uri: json["carousel_uri"],
        filename: json["name"],
      );
}
