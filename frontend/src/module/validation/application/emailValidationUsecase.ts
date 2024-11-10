// 
import ValidationInterface from "../domain/validationInterface";

export default class EmailValidationUsecase implements ValidationInterface<string> {
    errorMessage: string;

    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    validate(value: string): boolean {
        // Refer to https://emailregex.com/
        return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
    }
}
