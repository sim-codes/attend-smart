import { BaseFormField } from "@/constants/types/forms";

export type LoginFieldId = 'email' | 'password';
export type SignupFieldId = LoginFieldId | 'username' | 'confirmPassword' | 'firstname' | 'lastname' | 'phonenumber' | 'roles';

export interface LoginFormField extends BaseFormField {
    id: LoginFieldId;
}

export interface SignupFormField extends BaseFormField {
    id: SignupFieldId;
}

export type SignupStep = 'personal' | 'account' | 'contact';

export interface SignupFormFields {
    [key: string]: {
        fields: SignupFormField[];
        title: string;
    }
}
