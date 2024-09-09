import PagerEntity from "@/module/pager/domain/pagerEntity";
import InsuranceEntity from "../doamin/insuranceEntity";
import InsuranceRepo from "../doamin/insuranceRepo";
import { InsuranceRequest } from "./insuranceDto";

export default class InsuranceUsecase {
    private _repo: InsuranceRepo;

    constructor(repo: InsuranceRepo) {
        this._repo = repo;
    }

    async getAllInsurance({ page }: { page: number }): Promise<[InsuranceEntity[], PagerEntity]> {
        return this._repo.query({ page });
    }

    async getInsuranceById(id: number): Promise<InsuranceEntity> {
        return this._repo.get(id);
    }

    async createInsurance(insurance: InsuranceRequest): Promise<void> {
        return this._repo.create(insurance);
    }

    async updateInsurance(id: number, insurance: InsuranceRequest): Promise<void> {
        return this._repo.update(id, insurance);
    }

    async deleteInsurance(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
