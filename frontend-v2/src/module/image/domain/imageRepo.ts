import ImageEntity from "./imageEntity";

export default interface ImageRepo {
    upload(file: File): Promise<ImageEntity>;

    delete(id: number): Promise<void>;
}
