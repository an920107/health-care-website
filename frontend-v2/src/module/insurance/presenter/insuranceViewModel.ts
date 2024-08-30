import { formatDate } from "date-fns";
import InsuranceEntity from "../doamin/insuranceEntity";

export default class InsuranceViewModel extends InsuranceEntity {
    constructor(insurance: InsuranceEntity) {
        super(insurance);
    }

    get applicationDateString(): string {
        return formatDate(this.applicationDate, "yyyy-MM-dd");
    }

    get incidentDateString(): string {
        return formatDate(this.incidentDate, "yyyy-MM-dd");
    }

    get claimDateString(): string {
        return formatDate(this.claimDate, "yyyy-MM-dd");
    }
}