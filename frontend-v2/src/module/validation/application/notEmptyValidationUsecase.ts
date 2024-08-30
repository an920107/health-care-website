import ValidationInterface from "../domain/validationInterface";

export default class NotEmptyValidationUsecase implements ValidationInterface<string> {
    errorMessage: string;
    
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    validate(value: string): boolean {
        return value !== "";
    }
}
