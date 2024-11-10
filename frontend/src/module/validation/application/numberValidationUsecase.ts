import ValidationInterface from "../domain/validationInterface";

export default class NumberValidationUsecase implements ValidationInterface<string> {
    errorMessage: string;
    
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    validate(value: string): boolean {
        return !isNaN(Number(value));
    }
}
