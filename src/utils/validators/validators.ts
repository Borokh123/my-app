export type FieldValidatorType = (value: string) => string | undefined;

export const required:FieldValidatorType = (value: string): string | undefined => {
    if (!value) return 'Field is required';
    return undefined;
}

export const maxLengthCreator = (maxValue: number):FieldValidatorType => (value) => {
    if (value.length > maxValue)
        return `Maxlength is ${maxValue} symbols`;
    return undefined;
}
