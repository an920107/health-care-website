import axios from "axios";
import ViewCountResponse from "../application/viewCountDto";
import ViewCountRepo from "../domain/viewCountRepo";
import { BACKEND_HOST } from "@/module/config/config";

export default class ViewCountRepoImpl implements ViewCountRepo {
    async get() : Promise<ViewCountResponse> {
        const response = await axios.get(new URL("/api/welcome", BACKEND_HOST).href);

        if (response.status !== 200)
            return Promise.reject(new Error(response.data));

        return new ViewCountResponse(response.data["data"]);
    }
}
