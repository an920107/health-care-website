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
        return this.claimDate ? formatDate(this.claimDate, "yyyy-MM-dd") : "";
    }

    get insuranceCompanyTimeString(): string {
        return this.insuranceCompanyTime ? formatDate(this.insuranceCompanyTime, "yyyy-MM-dd") : "";
    }
}
