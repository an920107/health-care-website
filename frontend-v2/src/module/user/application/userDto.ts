import UserEntity from "../domain/userEntity";

export class UserResponse extends UserEntity {
    constructor(json: any) {
        super({
            id: json.id,
            chineseName: json.chinese_name,
            role: json.role,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
