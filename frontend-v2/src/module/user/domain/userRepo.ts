import UserEntity from "./userEntity";
import UserRoleEnum from "./userRoleEnum";

export default interface UserRepo {
    query({ }: {
        role?: UserRoleEnum,
        search?: string,
    }): Promise<UserEntity[]>;

    get(): Promise<UserEntity>;

    update(id: string, role: UserRoleEnum): Promise<void>;

    delete(id: string): Promise<void>;
}
