export interface FormFieldProps {
label: string;
placeholder: string;
type?: 'text' | 'password';
value: string;
onChange: (value: string) => void;
helperText?: string;
errorText?: string;
isInvalid?: boolean;
isRequired?: boolean;
isDisabled?: boolean;
isReadOnly?: boolean;
}

export type LoginFieldId = 'email' | 'password';
export type SignupFieldId = LoginFieldId | 'username' | 'confirmPassword' | 'firstName';

interface BaseFormField {
    label: string;
    placeholder: string;
    type: 'text' | 'password';
    helperText?: string;
    isRequired?: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    username: string;
    confirmPassword: string;
}

export interface LoginFormField extends BaseFormField {
    id: LoginFieldId;
}


export interface SignupFormField extends BaseFormField {
    id: SignupFieldId;
}
