import TopicEntity from "./topicEntity";

export default class TopicGroupEntity {
    label: string;
    topics: TopicEntity[];

    constructor({
        label,
        topics,
    }: TopicGroupEntity) {
        this.label = label;
        this.topics = topics;
    }
}