import AttachmentEntity from "../domain/attachmentEntity";
import AttachmentRepo from "../domain/attachmentRepo";
import { AttachmentResponse } from "./attachmentDto";

export default class AttachmentUsecase {
    private _repo: AttachmentRepo;

    constructor(repo: AttachmentRepo) {
        this._repo = repo;
    }

    async getAttachmentInfo(id: number): Promise<AttachmentResponse> {
        return this._repo.get(id);
    }

    async uploadFile(
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<AttachmentResponse> {
        return this._repo.upload(file, onProgress);
    }

    async deleteAttachment(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
