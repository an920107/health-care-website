import axios from "axios";
import ImageEntity from "../domain/imageEntity";
import ImageRepo from "../domain/imageRepo";
import { BACKEND_HOST } from "@/module/config/config";
import { AttachmentResponse } from "@/module/attachment/application/attachmentDto";

export default class ImageRepoImpl implements ImageRepo {
    async upload(file: File): Promise<ImageEntity> {
        const formDate = new FormData();
        formDate.append("image", file, file.name);

        console.debug("POST /api/image with file:", file);
        const response = await axios.post(new URL("/api/image", BACKEND_HOST).href,
            formDate,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status !== 201) {
            return Promise.reject(new Error(response.data));
        }

        return new AttachmentResponse(response.data["data"]);
    }

    async delete(id: number): Promise<void> {
        const response = await axios.delete(new URL(`/api/attachment/${id}`, BACKEND_HOST).href);

        if (response.status !== 204) {
            return Promise.reject(new Error(response.data));
        }
    }
}
