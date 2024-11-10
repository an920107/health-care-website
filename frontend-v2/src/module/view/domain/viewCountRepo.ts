import ViewCountEntity from "./viewCountEntity";

export default interface ViewCountRepo {
    get(): Promise<ViewCountEntity>;
}
