import { IndexMenuUsecase } from "../../application/usecase/indexMenuUsecase";

export class IndexMenuViewModel {
    private _usecase: IndexMenuUsecase;

    constructor(usecase: IndexMenuUsecase) {
        this._usecase = usecase;
    }

    getGroups(): string[] {
        return this._usecase.getTopics().map((group) => group.label);
    }

    getTopicsInGroup(group: string): string[] {
        const topics = this._usecase.getTopics().find((g) => g.label === group)?.topics;
        return topics?.map((topic) => topic.label) || [];
    }

    getUri(topic: string): string {
        return `/page/${topic}`;
    }
}
