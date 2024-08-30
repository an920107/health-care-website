import { formatDate } from "date-fns";
import RestaurantEntity from "../domain/restaurantEntity";
import InspectionStatusEnum from "@/module/status/doamin/inspectionStatusEnum";
import ReleaseStatusEnum from "@/module/status/doamin/releaseStatusEnum";

export default class RestaurantViewModel extends RestaurantEntity {
    constructor(restaurant: RestaurantEntity) {
        super(restaurant);
    }

    get inspectedDateString(): string {
        return formatDate(this.inspectedTime, "yyyy-MM-dd");
    }

    get inspectedDateObject(): Date | undefined{
        const date = new Date(this.inspectedTime);
        if (isNaN(date.getTime())) return undefined;
        return date;
    }

    get inspectionStatus(): InspectionStatusEnum {
        return this.valid ? InspectionStatusEnum.Passed : InspectionStatusEnum.Failed;
    }

    get releaseStatus(): ReleaseStatusEnum {
        return this.visibility ? ReleaseStatusEnum.Released : ReleaseStatusEnum.Draft;
    }
}
