import { BaseFormField } from "@/constants/types/forms";

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
    date: string; // ISO date string
    status: string; // 'Present', 'Absent', etc.
    notes?: string;
}
