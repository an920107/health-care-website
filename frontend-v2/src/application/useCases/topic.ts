import { TopicEnum, TopicGroupEnum } from "@/domain/enums/topic";

export default class TopicUseCase {
    static getTopics(): { [key in TopicGroupEnum]: TopicEnum[] } {
        return {
            [TopicGroupEnum.About]: [
                TopicEnum.Workteam,
                TopicEnum.ServiceTime,
                TopicEnum.Transportation,
            ],
            [TopicGroupEnum.CheckUp]: [
                TopicEnum.FreshmenCheckUp,
                TopicEnum.PhysiqueCheck,
                TopicEnum.SpecialCheck,
            ],
            [TopicGroupEnum.Emergency]: [
                TopicEnum.EmergencyHotline,
                TopicEnum.InjuryProcess,
                TopicEnum.Aed,
            ],
            [TopicGroupEnum.Service]: [
                TopicEnum.Insurance,
                TopicEnum.Equipment,
                TopicEnum.Facility,
            ],
            [TopicGroupEnum.Workplace]: [
                TopicEnum.OnCampusService,
                TopicEnum.WorkplaceServicePlan,
            ],
            [TopicGroupEnum.Train]: [
                TopicEnum.Cpr,
                TopicEnum.TabaccoPrevention,
                TopicEnum.AidsPrevention,
                TopicEnum.DiseasePrevension,
            ],
            [TopicGroupEnum.Others]: [
                TopicEnum.DownloadArea,
                TopicEnum.Regulation,
            ],
        }
    }
}
