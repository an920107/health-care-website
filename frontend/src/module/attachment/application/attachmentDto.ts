import AttachmentEntity from "../domain/attachmentEntity";

export class AttachmentResponse extends AttachmentEntity {
    constructor(json: any) {
        super({
            id: json.id,
            filename: json.filename,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
