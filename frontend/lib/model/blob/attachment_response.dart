class AttachmentResponse {
  String id;
  String name;
  String infoUrl;
  String blobUrl;

  AttachmentResponse({
    required this.id,
    required this.name,
    required this.infoUrl,
    required this.blobUrl,
  });

  factory AttachmentResponse.fromJson(Map<String, dynamic> json) =>
      AttachmentResponse(
        id: json["attachment_id"],
        name: json["attachment_name"],
        infoUrl: json["attachment_info"],
        blobUrl: json["attachment_uri"],
      );
}
