import { BaseFormField } from "@/constants/types/forms";

export interface Course {
    id: string;
    title: string;
    courseCode: string;
    creditUnits: number;
}

export interface CourseApiResponse extends Course {
    name: string;
    departmentId: string;
    levelId: string;
}

export interface EnrollmentResponse {
    id: string;
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

export interface EnrollmentPayload {
    courseId: string;
}

export type CourseEnrollmentFieldId = "faculty" | "department" | "course"

export interface CourseEnrollmentField extends BaseFormField {
    id:  CourseEnrollmentFieldId;
}

export interface CourseListProps {
    courses: EnrollmentResponse[];
    onDeleteCourses?: (courseIds: string[]) => Promise<void>;
}
