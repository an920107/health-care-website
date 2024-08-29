import axios from "axios";
import UserRepo from "../domain/userRepo";
import UserRoleEnum from "../domain/userRoleEnum";
import { BACKEND_HOST } from "@/module/config/config";
import { UserResponse } from "../application/userDto";
import Cookies from "js-cookie";

export default class UserRepoImpl implements UserRepo {
    async query({
        role,
        search,
    }: {
        role?: UserRoleEnum;
        search?: string;
    }): Promise<UserResponse[]> {
        const params: any = {};
        if (role) params.role = role;
        if ((search ?? "").trim().length > 0) {
            params.search = search;
        }

        const response = await axios.get(new URL("/api/auth/user/all", BACKEND_HOST).href, {
            params: params,
        });

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return (response.data["data"] as Array<any>).map((user) => new UserResponse(user));
    }

    async get(): Promise<UserResponse> {
        const response = await axios.get(new URL("/api/auth/user", BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new UserResponse(response.data["data"]);
    }

    async update(id: string, role: UserRoleEnum): Promise<void> {
        const response = await axios.patch(new URL(`/api/auth/user/${id}`, BACKEND_HOST).href,
            { "role": role },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": Cookies.get("csrf_access_token"),
                },
            }
        );

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }

    async delete(id: string): Promise<void> {
        const response = await axios.delete(new URL(`/api/auth/user/${id}`, BACKEND_HOST).href);

        if (response.status !== 204)
            return Promise.reject(new Error(response.data));
    }
}
