export class TopicEntity {
    label: string;

    constructor({
        label,
    }: TopicEntity) {
        this.label = label;
    }
}

export class TopicGroupEntity {
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
