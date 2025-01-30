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

export interface StudentProfile extends BaseStudentProfile {
    userId: string;
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

export interface ProfileState {
    data: StudentProfile | null;
    isLoading: boolean;
    error: string | null;
}
