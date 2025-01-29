import { ReactNode } from 'react';

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

export type ChangePasswordFieldId = 'email' | 'currentPassword' | 'newPassword' | 'confirmPassword';

export interface ChangePasswordFormField extends BaseFormField {
    id: ChangePasswordFieldId;
}

export interface ChangePasswordCredentials {
    email: string;
    currentPassword: string;
    newPassword: string;
}

export type ProfileUpdateFieldId = 'firstname' | 'email' | 'lastname' | 'phonenumber' | "matriculationNumber" | "level" | "department" | "faculty";
export type ProfileUpdateStep = 'personalInfo' | 'faculty';

export interface ProfileUpdateFormField extends BaseFormField {
    id: ProfileUpdateFieldId;
}

export interface ProfileUpdateFormFields {
    [key: string]: {
        fields: ProfileUpdateFormField[];
        title: string;
    }
}

export type LoginFieldId = 'username' | 'password';
export type SignupFieldId = LoginFieldId | 'email' | 'confirmPassword' | 'firstname' | 'lastname' | 'phonenumber' | 'roles';

interface BaseFormField {
    label: string;
    placeholder: string;
    type: 'text' | 'password' | 'select';
    options?: { value: string; label: string; }[];
    helperText?: string;
    isReadOnly?: boolean;
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

export type AttendanceFieldId = "course" | "status"

export interface AttendanceField extends BaseFormField {
    id:  AttendanceFieldId;
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

export interface ApiResponseWithHeader<T> {
    data?: T[];
    headers?: any;
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

export interface AuthState {
    user: UserProfile | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
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
    profileImageUrl: string;
    roles: string[];
}

export interface CodeResponse {
    status: number;
}

export type Schedule = {
    id: string;
    time: string;
    title: string;
    description?: string;
};

export type ScheduleApiResponse = {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    classroom: string;
    courseTitle: string;
    sessionId: string;
    courseId: string;
    levelId: string;
    departmentId: string;
    classroomId: string;
};

export type CalendarScheduleProps = {
    schedules: ScheduleApiResponse[];
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

export interface EnrollmentResponse {
    id: string;
    name: string;
    courseId: string;
    courseTitle: string;
    courseCode: string;
    creditUnits: number;
    enrollmentDate: string;
}

export interface CoursesState {
    data: EnrollmentResponse[];
    isLoading: boolean;
    error: string | null;
}

export interface BaseStudentProfile {
    matriculationNumber: string;
    level: string;
    department: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
}

export interface StudentProfileUpdateCredentials {
    matriculationNumber: string;
    levelId: string;
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
}

export interface StudentProfile extends BaseStudentProfile {
    userId: string;
}

export interface ProfileState {
    data: StudentProfile | null;
    isLoading: boolean;
    error: string | null;
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

export interface EnrollmentPayload {
    courseId: string;
}
