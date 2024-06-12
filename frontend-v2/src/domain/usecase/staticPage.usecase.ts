import { PageGroup, PageTopic } from "../entity/staticPage.entity";

export function getPageTopics(): { [key in PageGroup]: PageTopic[] } {
    return {
        [PageGroup.About]: [
            PageTopic.Workteam,
            PageTopic.ServiceTime,
            PageTopic.Transportation,
        ],
        [PageGroup.CheckUp]: [
            PageTopic.FreshmenCheckUp,
            PageTopic.PhysiqueCheck,
            PageTopic.SpecialCheck,
        ],
        [PageGroup.Emergency]: [
            PageTopic.EmergencyHotline,
            PageTopic.InjuryProcess,
            PageTopic.Aed,
        ],
        [PageGroup.Service]: [
            PageTopic.Insurance,
            PageTopic.Equipment,
            PageTopic.Facility,
        ],
        [PageGroup.Workplace]: [
            PageTopic.OnCampusService,
            PageTopic.WorkplaceServicePlan,
        ],
        [PageGroup.Train]: [
            PageTopic.Cpr,
            PageTopic.TabaccoPrevention,
            PageTopic.AidsPrevention,
            PageTopic.DiseasePrevension,
        ],
        [PageGroup.Others]: [
            PageTopic.DownloadArea,
            PageTopic.Regulation,
        ],
    }
}