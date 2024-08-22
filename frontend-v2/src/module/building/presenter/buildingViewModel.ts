import BuildingEntity from "../domain/buildingEntity";

export default class BuildingViewModel extends BuildingEntity {
    constructor(building: BuildingEntity) {
        super(building);
    }
    
    get isEmptyUser(): boolean {
        return this.userId.length === 0;
    }
}
