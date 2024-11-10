import ViewCountEntity from "../domain/viewCountEntity";

export default class ViewCountResponse extends ViewCountEntity {
    constructor(json: any) {
        super({
            id: json.id,
            view: json.viewer,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        })
    }
}
