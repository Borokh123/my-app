export const required = value => {
    if (!value) return 'Field is required';
    return undefined;
}

export const maxLengthCreator = maxValue => value => {
    if (value.length > maxValue)
        return `Maxlength is ${maxValue} symbols`;
    return undefined;
}
