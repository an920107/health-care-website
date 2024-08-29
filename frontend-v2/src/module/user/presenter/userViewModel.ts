import UserEntity from "../domain/userEntity";
import UserRoleEnum from "../domain/userRoleEnum";

export default class UserViewModel extends UserEntity {
    constructor(entity: UserEntity) {
        super(entity);
    }

    get roleString(): string {
        return UserRoleEnum[this.role];
    }
}
