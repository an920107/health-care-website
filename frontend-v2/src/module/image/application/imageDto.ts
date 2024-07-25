import ImageEntity from "../domain/imageEntity";

export class ImageResponse extends ImageEntity {
    constructor(json: any) {
        super({
            id: json.id,
            filename: json.filename,
            updatedTime: new Date(json.updated_time),
            createdTime: new Date(json.created_time),
        });
    }
}
