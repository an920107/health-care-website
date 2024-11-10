import { Dispatch, SetStateAction } from "react";
import AttachmentUsecase from "../application/attachmentUsecase";
import AttachmentEntity from "../domain/attachmentEntity";

export default class AttachmentFetchAction {
    private _usecase: AttachmentUsecase;
    private _setAttachments: Dispatch<SetStateAction<AttachmentEntity[]>>;

    constructor({
        usecase,
        setAttachments,
    }: {
        usecase: AttachmentUsecase,
        setAttachments: Dispatch<SetStateAction<AttachmentEntity[]>>,
    }) {
        this._usecase = usecase;
        this._setAttachments = setAttachments;
    }

    async invoke(ids: number[]) {
        const buffer: AttachmentEntity[] = [];
        for (var id of ids) {
            await this._usecase.getAttachmentInfo(id)
                .then((entity) => buffer.push(entity))
                .catch((err) => console.error("Fetching attachment failed:", err));
        }
        if (buffer.length > 0) this._setAttachments(buffer);
    }
}