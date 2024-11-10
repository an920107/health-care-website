import CarouselEntity from "../domain/carouselEntity";
import CarouselRepo from "../domain/carouselRepo";

export default class CarouselUsecase {
    private _repo: CarouselRepo;

    constructor(repo: CarouselRepo) {
        this._repo = repo;
    }

    async getAllCarousels({
        visibility = false,
    }: {
        visibility?: boolean;
    }): Promise<CarouselEntity[]> {
        return this._repo.query({ visibility: visibility });
    }

    async getCarouselInfo(id: number): Promise<CarouselEntity> {
        return this._repo.get(id);
    }

    async createCarousel(file: File, carousel: CarouselEntity): Promise<void> {
        return this._repo.create(file, carousel);
    }

    async updateCarousel(id: number, carousel: CarouselEntity): Promise<void> {
        return this._repo.update(id, carousel);
    }

    async deleteCarousel(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
