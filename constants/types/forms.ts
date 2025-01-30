export interface BaseFormField {
    label: string;
    placeholder: string;
    type: 'text' | 'password' | 'select';
    options?: { value: string; label: string; }[];
    helperText?: string;
    isReadOnly?: boolean;
    isRequired?: boolean;
}

export interface FormFieldProps extends BaseFormField {
    value: string;
    onChange: (value: string) => void;
    errorText?: string;
    isInvalid?: boolean;
    isDisabled?: boolean;
}
