import UserRepo from "../domain/userRepo";

export default class UserUsecase {
    private _repo: UserRepo;

    constructor(repo: UserRepo) {
        this._repo = repo;
    }
}
