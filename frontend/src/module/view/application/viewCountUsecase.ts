import ViewCountRepo from "../domain/viewCountRepo";
import ViewCountResponse from "./viewCountDto";

export default class ViewCountUsecase {
    private _repo: ViewCountRepo;

    constructor(repo: ViewCountRepo) {
        this._repo = repo;
    }

    async getViewCount(): Promise<ViewCountResponse> {
        return this._repo.get();
    }
}
