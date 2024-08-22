import BuildingEntity from "./buildingEntity";

export default interface BuildingRepo {
    query(): Promise<BuildingEntity[]>;

    get(id: number): Promise<BuildingEntity>;

    create(building: BuildingEntity): Promise<void>;

    update(id: number, building: BuildingEntity): Promise<void>;

    delete(id: number): Promise<void>;
}
