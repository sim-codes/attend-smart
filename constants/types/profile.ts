import { BaseFormField } from "@/constants/types/forms";

export type ProfileUpdateFieldId = 'firstname' | 'email' | 'lastname' | 'phonenumber' | 'matriculationNumber' | 'level' | 'department' | 'faculty';
export type ProfileFieldId = 'matriculationNumber' | 'level' | 'department' | 'faculty';
export type ProfileStep = 'faculty' | 'details';
export type ProfileUpdateStep = 'personalInfo' | 'faculty';
export type ChangePasswordFieldId = 'email' | 'currentPassword' | 'newPassword' | 'confirmPassword';

export interface ChangePasswordFormField extends BaseFormField {
    id: ChangePasswordFieldId;
}

export interface ProfileUpdateFormField extends BaseFormField {
    id: ProfileUpdateFieldId;
}

export interface ProfileCreationFormField extends BaseFormField {
    id: ProfileFieldId;
}

export interface ProfileUpdateFormFields {
    [key: string]: {
        fields: ProfileUpdateFormField[];
        title: string;
    }
}

export interface ProfileCreationFormFields {
    [key: string]: {
        fields: ProfileCreationFormField[];
        title: string;
    }
}

export interface ProfileCreationCredentials {
    matriculationNumber: string;
    levelId: string;
    departmentId: string;
}
