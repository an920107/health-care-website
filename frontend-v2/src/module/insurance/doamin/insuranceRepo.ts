import PagerEntity from "@/module/pager/domain/pagerEntity";
import InsuranceEntity from "./insuranceEntity";

export default interface InsuranceRepo {
    query({ }: {
        page: number,
        search: string,
    }): Promise<[InsuranceEntity[], PagerEntity]>;

    get(id: number): Promise<InsuranceEntity>;

    create(insurance: Partial<InsuranceEntity>): Promise<void>;

    update(id: number, insurance: Partial<InsuranceEntity>): Promise<void>;

    delete(id: number): Promise<void>;
}
