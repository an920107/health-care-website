import { BACKEND_HOST } from "@/module/config/config";
import ImageEntity from "../domain/imageEntity";

export default class ImageViewModel extends ImageEntity {
    constructor(entity: ImageEntity) {
        super(entity);
    }

    get url(): string {
        return new URL(`/api/image/${this.id}`, BACKEND_HOST).href;
    }
}