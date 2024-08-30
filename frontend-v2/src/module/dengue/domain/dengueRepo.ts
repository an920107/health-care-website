import PagerEntity from "@/module/pager/domain/pagerEntity";
import DengueEntity from "./dengueEntity";

export default interface DengueRepo {
    query({ }: {
        page?: number;
    }): Promise<[DengueEntity[], PagerEntity]>;

    get(id: number): Promise<DengueEntity>;

    create(dengue: DengueEntity): Promise<void>;

    update(id: number, dengue: DengueEntity): Promise<void>;

    delete(id: number): Promise<void>;
}