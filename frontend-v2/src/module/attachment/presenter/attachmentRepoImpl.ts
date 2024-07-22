import { BACKEND_HOST } from "@/module/config/config";
import AttachmentEntity from "../domain/attachmentEntity";
import axios from "axios";
import AttachmentRepo from "../domain/attachmentRepo";
import { AttachmentResponse } from "../application/attachmentDto";

export default class AttachmentRepoImpl implements AttachmentRepo {
    async get(id: number): Promise<AttachmentEntity> {
        const response = await axios.get(new URL(`/api/attachment/${id}/info`, BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new AttachmentResponse(response.data["data"]);
    }

    async upload(
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<AttachmentEntity> {
        const formData = new FormData();
        formData.append("file", file);

        console.debug("POST /api/attachment with file: ", file);
        const response = await axios.post(new URL("/api/attachment", BACKEND_HOST).href,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (event) => onProgress && onProgress(
                    event.total === undefined ? Number.NaN : event.loaded / event.total!),
            }
        );

        if (response.status !== 201)
            return Promise.reject(new Error(response.data));

        return new AttachmentResponse(response.data["data"]);
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/attachment/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
