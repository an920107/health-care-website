import BuildingEntity from "../domain/buildingEntity";
import BuildingRepo from "../domain/buildingRepo";

export default class BuildingUsecase {
    private _repo: BuildingRepo;

    constructor(repo: BuildingRepo) {
        this._repo = repo;
    }

    async getAllBuildings(userId: string): Promise<BuildingEntity[]> {
        return this._repo.query(userId);
    }

    async getBuildingById(id: number): Promise<BuildingEntity> {
        return this._repo.get(id);
    }

    async createBuilding(building: BuildingEntity): Promise<void> {
        return this._repo.create(building);
    }

    async updateBuilding(id: number, building: BuildingEntity): Promise<void> {
        return this._repo.update(id, building);
    }

    async deleteBuilding(id: number): Promise<void> {
        return this._repo.delete(id);
    }
}
