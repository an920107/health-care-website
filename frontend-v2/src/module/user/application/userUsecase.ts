import PagerEntity from "@/module/pager/domain/pagerEntity";
import UserEntity from "../domain/userEntity";
import UserRepo from "../domain/userRepo";
import UserRoleEnum from "../domain/userRoleEnum";

export default class UserUsecase {
    private _repo: UserRepo;

    constructor(repo: UserRepo) {
        this._repo = repo;
    }

    async getAllUsers({
        role,
        search,
        page,
    }: {
        role?: UserRoleEnum;
        search?: string;
        page?: number;
    }): Promise<[UserEntity[], PagerEntity]> {
        return this._repo.query({ role, search, page });
    }

    async getCurrentUser(): Promise<UserEntity> {
        return this._repo.get();
    }

    async updateUser(id: string, user: UserRoleEnum): Promise<void> {
        return this._repo.update(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        return this._repo.delete(id);
    }
}
