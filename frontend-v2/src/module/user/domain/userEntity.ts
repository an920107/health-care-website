import UserRoleEnum from "./userRoleEnum";

export default class UserEntity {
    id: string;
    chineseName: string;
    role: UserRoleEnum;
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
