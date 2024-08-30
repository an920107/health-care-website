import { formatDate } from "date-fns";
import DengueEntity from "../domain/dengueEntity";

export default class DengueViewModel extends DengueEntity {
    constructor(dengue: DengueEntity) {
        super(dengue);
    }

    get inspectionMonthString(): string {
        return formatDate(this.inspectionTime, "yyyy 年 MM 月");
    }

    get filledDateString(): string {
        return formatDate(this.inspectionTime, "yyyy-MM-dd");
    }
}
