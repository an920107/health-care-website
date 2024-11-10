export type ValidateCallback<T> = (value: T) => boolean;

export default interface ValidationInterface<T> {
    validate: ValidateCallback<T>;
    errorMessage: string;
}
