import { BACKEND_HOST } from "@/module/config/config";
import DownloadEntity from "../domain/downloadEntity";
import { formatDate } from "date-fns";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";

export default class DownloadViewModel extends DownloadEntity {
    constructor(entity: DownloadEntity) {
        super(entity);
    }

    get downloadUrl(): string {
        return new URL(`/api/download/${this.id}`, BACKEND_HOST).href;
    }

    get releasedDateString(): string {
        return formatDate(this.createdTime, "yyyy-MM-dd");
    }

    get releaseStatus(): ReleaseStatusEnum {
        return this.visibility ? ReleaseStatusEnum.Released : ReleaseStatusEnum.Draft;
    }
}
