import UserEntity from "./userEntity";

export default interface UserRepo {
    query({ }: {
        role?: number,
        search?: string,
    }): Promise<UserEntity[]>;

    get(id: number): Promise<UserEntity>;

    update(user: UserEntity): Promise<void>;
}
