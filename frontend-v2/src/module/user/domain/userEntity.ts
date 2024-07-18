export default class UserEntity {
    id: number;
    chineseName: string;
    role: number;
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        chineseName,
        role,
        createdTime,
        updatedTime,
    }: UserEntity) {
        this.id = id;
        this.chineseName = chineseName;
        this.role = role;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
