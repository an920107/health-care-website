import { Dispatch, SetStateAction } from "react";
import AttachmentUsecase from "../application/attachmentUsecase";
import UploadingAttachmentEntity from "../domain/uploadingAttachmentEntity";
import AttachmentEntity from "../domain/attachmentEntity";
import UploadingPregressMap from "../domain/uploadingProgressMap";

export default class AttachmentUploadAction {
    private _usecase: AttachmentUsecase;
    private _setAttachments: Dispatch<SetStateAction<AttachmentEntity[]>>;
    private _setUploadingAttachments: Dispatch<SetStateAction<UploadingAttachmentEntity[]>>;
    private _setUploadingProgressMap: Dispatch<SetStateAction<UploadingPregressMap>>;

    constructor({
        usecase,
        setAttachments,
        setUploadingAttachments,
        setUploadingProgressMap,
    }: {
        usecase: AttachmentUsecase,
        setAttachments: Dispatch<SetStateAction<AttachmentEntity[]>>,
        setUploadingAttachments: Dispatch<SetStateAction<UploadingAttachmentEntity[]>>,
        setUploadingProgressMap: Dispatch<SetStateAction<UploadingPregressMap>>,
    }) {
        this._usecase = usecase;
        this._setAttachments = setAttachments;
        this._setUploadingAttachments = setUploadingAttachments;
        this._setUploadingProgressMap = setUploadingProgressMap;

    }

    invoke(files: FileList | null) {
        if (files === null) return;

        for (var i = 0; i < files.length; i++) {
            if (files.item(i) === null) continue;

            const file = files.item(i)!;
            const state = Math.floor(Math.random() * 1e16);

            this._setUploadingAttachments((prev) => [
                ...prev,
                new UploadingAttachmentEntity({
                    state: state,
                    file: file,
                    uploadPromise: this._usecase.uploadFile(
                        file, (progress) => this._setUploadingProgressMap((prev) => ({ ...prev, [state]: progress })),
                    ).then((attachment) => {
                        this._setAttachments((prev) => [...prev, attachment]);
                        return attachment;
                    }).catch((err) => {
                        console.error("Failed to upload attachment", err)
                    }).finally(() => {
                        this._setUploadingProgressMap((prev) => {
                            delete prev[state];
                            return { ...prev };
                        });
                        this._setUploadingAttachments((prev) => prev.filter((e) => e.state !== state));
                    }),
                }),
            ]);
        }
    }
}