import TopicEntity from "./topicEntity";
import TopicGroupEnum from "./topicGroupEnum";

export default class TopicGroupEntity {
    label: TopicGroupEnum;
    topics: TopicEntity[];

    constructor({
        label,
        topics,
    }: TopicGroupEntity) {
        this.label = label;
        this.topics = topics;
    }
}