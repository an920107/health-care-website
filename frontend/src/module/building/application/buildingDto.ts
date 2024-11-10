import BuildingEntity from "../domain/buildingEntity";

export class BuildingRequest extends BuildingEntity {
    constructor({
        name,
        userId = "",
    }: {
        name: string,
        userId?: string,
    }) {
        super({
            id: 0,
            name: name,
            userId: userId,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): any {
        return {
            name: this.name,
            user_id: this.userId,
        };
    }
}

export class BuildingResponse extends BuildingEntity {
    constructor(json: any) {
        super({
            id: json.id,
            name: json.name,
            userId: json.user_id,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
