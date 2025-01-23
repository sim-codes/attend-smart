import { ReactNode } from 'react';

export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

export interface FormFieldProps {
label: string;
placeholder: string;
type?: 'text' | 'password' | 'select';
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
    type: 'text' | 'password' | 'select';
    options?: { value: string; label: string; }[];
    helperText?: string;
    isRequired?: boolean;
}
export type ProfileStep = 'faculty' | 'details';

export type ProfileFieldId = "matriculationNumber" | "level" | "department"| "faculty";
export interface ProfileCreationFormField extends BaseFormField {
    id: ProfileFieldId;
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

export interface LoginFormField extends BaseFormField {
    id: LoginFieldId;
}

export type CourseEnrollmentFieldId = "faculty" | "department" | "course"

export interface CourseEnrollmentField extends BaseFormField {
    id:  CourseEnrollmentFieldId;
}

export interface CourseApiResponse extends Course {
    name: string;
    departmentId: string;
    levelId: string;
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
    id: string;
    title: string;
    courseCode: string;
    creditUnits: number;
}
export interface CourseListProps {
    courses: EnrollmentResponse[];
    onDeleteCourses?: (courseIds: string[]) => Promise<void>;
}

export interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void | Promise<void>;
    title?: string;
    actionText?: string;
    cancelText?: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    isLoading?: boolean;
    closeOnAction?: boolean;
    preventCloseOnAction?: boolean;
}

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void;
    title?: string;
    actionText?: string;
    cancelText?: string;
    children: ReactNode;
}

export interface EnrollmentResponse {
    id: string;
    courseId: string;
    courseTitle: string;
    courseCode: string;
    creditUnits: number;
    enrollmentDate: string;
}

export interface AppContextType {
    profile: StudentProfile | null;
    updateProfile: (newProfile: StudentProfile) => void;
}

export interface StudentProfile {
    userId: string;
    matriculationNumber: string;
    level: string;
    department: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
}

export interface ErrorResponse {
    message: string;
    code?: string;
    details?: any;
}

export interface ServiceResponse<T> {
    data?: T;
    error?: ErrorResponse;
    success: boolean;
}

export interface FacultyAndDepartmentApiResponse{
    id: string;
    name: string;
    code: string;
}

export interface Option {
    value: string;
    label: string;
}

export interface LevelApiResponse {
    id: string;
    name: string;
}
