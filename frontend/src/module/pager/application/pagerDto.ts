import PagerEntity from "../domain/pagerEntity";

export class PagerResponse extends PagerEntity {
    constructor(json: any) {
        if (json.total_page === 0) {
            json.total_page = 1;
        }

        super({
            totalPage: json.total_page,
        });
    }
}