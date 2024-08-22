import PagerEntity from "@/module/pager/domain/pagerEntity";
import InsuranceEntity from "./insuranceEntity";

export default interface InsuranceRepo {
    query({ }: {
        page: number,
    }): Promise<[InsuranceEntity[], PagerEntity]>;

    get(id: number): Promise<InsuranceEntity>;

    create(insurance: InsuranceEntity): Promise<void>;

    update(id: number, insurance: InsuranceEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
