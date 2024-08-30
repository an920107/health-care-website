import PagerEntity from "@/module/pager/domain/pagerEntity";
import DengueEntity from "../domain/dengueEntity";
import DengueRepo from "../domain/dengueRepo";

export default class DengueUsecase {
    private _repo: DengueRepo;

    constructor(repo: DengueRepo) {
        this._repo = repo;
    }

    async getAllDengues({
        page,
    }: {
        page: number;
    }): Promise<[DengueEntity[], PagerEntity]> {
        return this._repo.query({ page });
    }

    async getDengueById(id: number): Promise<DengueEntity> {
        return this._repo.get(id);
    }

    async createDengue(dengue: DengueEntity): Promise<void> {
        return this._repo.create(dengue);
    }

    async updateDengue(id: number, dengue: DengueEntity): Promise<void> {
        return this._repo.update(id, dengue);
    }

    async deleteDengue(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
