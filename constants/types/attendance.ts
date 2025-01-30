import { BaseFormField } from "@/constants/types/forms";

export type AttendanceFieldId = "course" | "status"

export interface AttendanceField extends BaseFormField {
    id:  AttendanceFieldId;
}