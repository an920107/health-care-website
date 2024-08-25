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
    }: {
        role?: UserRoleEnum;
        search?: string;
    }) {
        return this._repo.query({ role, search });
    }

    async getUserById(id: number) {
        return this._repo.get(id);
    }

    async updateUser(id: number, user: UserRoleEnum) {
        return this._repo.update(id, user);
    }
}
