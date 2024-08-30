import TopicEntity from "../domain/topicEntity";
import TopicGroupEntity from "../domain/topicGroupEntity";
import TopicEnum from "../domain/topicEnum";
import TopicGroupEnum from "../domain/topicGroupEnum";


export default class IndexMenuUsecase {
    getTopicGroups(): TopicGroupEntity[] {
        return [
            new TopicGroupEntity({
                label: TopicGroupEnum.About,
                topics: [
                    new TopicEntity({ label: TopicEnum.Workteam }),
                    new TopicEntity({ label: TopicEnum.ServiceTime }),
                    new TopicEntity({ label: TopicEnum.Transportation }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.CheckUp,
                topics: [
                    new TopicEntity({ label: TopicEnum.FreshmenCheckUp }),
                    new TopicEntity({ label: TopicEnum.PhysiqueCheck }),
                    new TopicEntity({ label: TopicEnum.SpecialCheck }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.Emergency,
                topics: [
                    new TopicEntity({ label: TopicEnum.EmergencyHotline }),
                    new TopicEntity({ label: TopicEnum.InjuryProcess }),
                    new TopicEntity({ label: TopicEnum.Aed }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.Service,
                topics: [
                    new TopicEntity({ label: TopicEnum.Insurance }),
                    new TopicEntity({ label: TopicEnum.Equipment }),
                    new TopicEntity({ label: TopicEnum.Facility }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.Workplace,
                topics: [
                    new TopicEntity({ label: TopicEnum.OnCampusService }),
                    new TopicEntity({ label: TopicEnum.WorkplaceServicePlan }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.Train,
                topics: [
                    new TopicEntity({ label: TopicEnum.Cpr }),
                    new TopicEntity({ label: TopicEnum.TabaccoPrevention }),
                    new TopicEntity({ label: TopicEnum.AidsPrevention }),
                    new TopicEntity({ label: TopicEnum.DiseasePrevension }),
                ],
            }),
            new TopicGroupEntity({
                label: TopicGroupEnum.Others,
                topics: [
                    new TopicEntity({ label: TopicEnum.DownloadArea }),
                    new TopicEntity({ label: TopicEnum.Regulation }),
                ],
            }),
        ];
    }

    getTopicGroupsExcept(topics: TopicEnum[]) {
        const groups = this.getTopicGroups();
        groups.map((group) => {
            group.topics = group.topics.filter((topic) => !topics.includes(topic.label));
        });
        return groups.filter((group) => group.topics.length > 0);
    }
}
