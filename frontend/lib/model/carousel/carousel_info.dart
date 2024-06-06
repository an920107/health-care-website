class CarouselInfo {
  String id;
  String uri;
  String filename;
  String postId;

  CarouselInfo({
    required this.id,
    required this.uri,
    required this.filename,
    required this.postId,
  });

  factory CarouselInfo.fromJson(Map<String, dynamic> json) => CarouselInfo(
        id: json["id"],
        uri: json["carousel_uri"],
        filename: json["name"],
        postId: json["post_id"],
      );
}
