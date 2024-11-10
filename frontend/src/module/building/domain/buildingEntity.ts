export default class BuildingEntity {
    id: number;
    name: string;
    userId: string;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        name,
        userId,
        createdTime,
        updatedTime,
    }: {
        id: number,
        name: string,
        userId: string,
        createdTime: Date,
        updatedTime: Date,
    }) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
