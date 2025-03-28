import { BaseFormField } from "@/constants/types/forms";
import { Metadata } from "./common";

export type AttendanceFieldId = "course" | "status"

export interface AttendanceField extends BaseFormField {
    id:  AttendanceFieldId;
}

export interface AttendanceStats {
    totalClasses: number;
    present: number;
    absent: number;
    attendancePercentage: number;
}

export interface CourseAttendanceSummary {
    courseId: string;
    courseTitle: string;
    classesAttended: number;
    totalClasses: number;
    percentage: number;
}

export interface AttendanceRecord {
    id: string;
    courseId: string;
    courseTitle: string;
    recordedAt: string;
    status: string;
    notes?: string;
}

export interface AttendaceApiResponse {
    reports: AttendanceRecord[];
    metadata: Metadata;
}

export interface AttendancePayload {
    status: string;
    notes?: string;
    courseId: string;
    studentLon: number;
    studentLat: number;
    accuracy: number;
}
