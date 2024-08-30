import CarouselEntity from "./carouselEntity";

export default interface CarouselRepo {
    query({ }: {
        visibility?: boolean;
    }): Promise<CarouselEntity[]>;

    get(id: number): Promise<CarouselEntity>;

    create(file: File, carousel: CarouselEntity): Promise<void>;

    update(id: number, carousel: CarouselEntity): Promise<void>;

    delete(id: number): Promise<void>;
}

