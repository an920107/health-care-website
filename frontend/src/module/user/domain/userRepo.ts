import PagerEntity from "@/module/pager/domain/pagerEntity";
import UserEntity from "./userEntity";
import UserRoleEnum from "./userRoleEnum";

export default interface UserRepo {
    query({ }: {
        role?: UserRoleEnum,
        search?: string,
        page?: number,
    }): Promise<[UserEntity[], PagerEntity]>;

    get(): Promise<UserEntity>;

    update(id: string, role: UserRoleEnum): Promise<void>;

    delete(id: string): Promise<void>;
}
