import { BACKEND_HOST } from "@/module/config/config";
import CarouselEntity from "../domain/carouselEntity";
import { formatDate } from "date-fns";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";

export default class CarouselViewModel extends CarouselEntity {
    constructor(carousel: CarouselEntity) {
        super(carousel);
    }

    get imageUrl() {
        return new URL(`/api/carousel/${this.id}`, BACKEND_HOST).href;
    }

    get releasedDate() {
        return formatDate(this.createdTime, "yyyy-MM-dd");
    }

    get releaseStatus() {
        return this.visibility ? ReleaseStatusEnum.Released : ReleaseStatusEnum.Draft;
    }
}
