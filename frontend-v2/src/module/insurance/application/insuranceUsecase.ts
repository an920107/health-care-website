import PagerEntity from "@/module/pager/domain/pagerEntity";
import InsuranceEntity from "../doamin/insuranceEntity";
import InsuranceRepo from "../doamin/insuranceRepo";

export default class InsuranceUsecase {
    private _repo: InsuranceRepo;

    constructor(repo: InsuranceRepo) {
        this._repo = repo;
    }

    async query({ page }: { page: number }): Promise<[InsuranceEntity[], PagerEntity]> {
        return this._repo.query({ page });
    }

    async get(id: number): Promise<InsuranceEntity> {
        return this._repo.get(id);
    }

    async create(insurance: InsuranceEntity): Promise<void> {
        return this._repo.create(insurance);
    }

    async update(id: number, insurance: InsuranceEntity): Promise<void> {
        return this._repo.update(id, insurance);
    }

    async delete(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
