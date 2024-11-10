import ValidationInterface from "../domain/validationInterface";

export default class LengthValidationUsecase implements ValidationInterface<string> {
    errorMessage: string;
    length: number;

    constructor(length: number, errorMessage: string) {
        this.length = length;
        this.errorMessage = errorMessage;
    }

    validate(text: string): boolean {
        return text.length <= this.length;
    }
}