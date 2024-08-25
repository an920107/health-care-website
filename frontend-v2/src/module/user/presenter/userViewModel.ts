import UserEntity from "../domain/userEntity";

export default class UserViewModel extends UserEntity {
    constructor(entity: UserEntity) {
        super(entity);
    }
}
