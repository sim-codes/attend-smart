import { ReactNode } from 'react';

export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

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

export type LoginFieldId = 'username' | 'password';
export type SignupFieldId = LoginFieldId | 'email' | 'confirmPassword' | 'firstname' | 'lastname' | 'phonenumber' | 'roles';

interface BaseFormField {
    label: string;
    placeholder: string;
    type: 'text' | 'password';
    helperText?: string;
    isRequired?: boolean;
}

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

export interface TokenDto {
    accessToken: string;
    refreshToken: string;
}
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    profileImageUrl: string;
    roles: string[];
}

export interface LoginResponse {
    token: TokenDto;
    user: UserProfile;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignUpCredentials {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    roles: string[];
}

export interface SignupResponse {
    status: number;
}

export type Schedule = {
    id: string;
    time: string;
    title: string;
    description?: string;
};

export type ScheduleMap = {
    [date: string]: Schedule[];
};

export type CalendarScheduleProps = {
    schedules: ScheduleMap;
    onSchedulePress?: (schedule: Schedule) => void;
};

export interface Course {
    id: number;
    name: string;
    courseCode: string;
    creditUnits: number;
}
export interface CourseListProps {
    courses: Course[];
    onDeleteCourses?: (courseIds: number[]) => Promise<void>;
}

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void;
    title?: string;
    actionText?: string;
    cancelText?: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
}

export interface EnrollmentResponse {
    id: number;
    studentId: number;
    courseId: number;
    enrollmentDate: string;
}
