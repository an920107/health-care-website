import CarouselEntity from "./carouselEntity";

export default interface CarouselRepo {
    get(id: number): Promise<CarouselEntity>;

    create(carousel: CarouselEntity): Promise<void>;

    update(carousel: CarouselEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
