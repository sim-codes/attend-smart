import { BaseFormField } from "@/constants/types/forms";
import { Metadata } from "./common";

export interface Course {
    id: string;
    title: string;
    name: string;
    courseCode: string;
    creditUnits: number;
}

export interface CourseData {
    id: string;
    name: string;
    departmentId: string;
    levelId: string;
}

export interface CourseApiResponse extends Course {
    courses: Course[];
    metadata: Metadata;
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
