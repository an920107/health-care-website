import TopicEnum from "./topicEnum";

export default class TopicEntity {
    label: TopicEnum;

    constructor({
        label,
    }: TopicEntity) {
        this.label = label;
    }
}
