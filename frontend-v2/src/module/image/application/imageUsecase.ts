import ImageEntity from "../domain/imageEntity";
import ImageRepo from "../domain/imageRepo";
import { ImageResponse } from "./imageDto";

export default class ImageUsecase {
    private _repo: ImageRepo;

    constructor(repo: ImageRepo) {
        this._repo = repo;
    }

    async uploadImage(file: File): Promise<ImageResponse> {
        return this._repo.upload(file);
    }

    async deleteImage(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
