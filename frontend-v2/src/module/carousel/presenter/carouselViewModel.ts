import { BACKEND_HOST } from "@/module/config/config";
import CarouselEntity from "../domain/carouselEntity";

export default class CarouselViewModel extends CarouselEntity{
    constructor(carousel: CarouselEntity) {
        super(carousel);
    }

    get imageUrl() {
        return new URL(`/api/carousel/${this.id}`, BACKEND_HOST).href;
    }
}
