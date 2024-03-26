class ImageResponse {
  String id;
  String uri;

  ImageResponse({
    required this.id,
    required this.uri,
  });

  factory ImageResponse.fromJson(Map<String, dynamic> json) => ImageResponse(
        id: json["image_id"],
        uri: json["image_uri"],
      );
}
