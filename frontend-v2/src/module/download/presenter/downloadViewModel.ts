import { BACKEND_HOST } from "@/module/config/config";
import DownloadEntity from "../domain/downloadEntity";

export default class DownloadViewModel extends DownloadEntity {
    constructor(entity: DownloadEntity) {
        super(entity);
    }

    get downloadUrl(): string {
        return new URL(`/api/download/${this.id}`, BACKEND_HOST).href;
    }
}
