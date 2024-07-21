import UploadingAttachmentEntity from "../domain/uploadingAttachmentEntity";
import UploadingPregressMap from "../domain/uploadingProgressMap";

export default class UploadingAttachmentViewModel extends UploadingAttachmentEntity {
    progressMap: UploadingPregressMap;

    constructor(entity: UploadingAttachmentEntity, progressMap: UploadingPregressMap) {
        super(entity);
        this.progressMap = progressMap;
    }

    get pregress(): number {
        return this.progressMap[this.state] * 100 ?? Number.NaN;
    }

    get filename(): string {
        return this.file.name;
    }
}