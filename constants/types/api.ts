export type Id = string;
export type StudentId = string;
export type FacultyId = string;
export type DepartmentId = string;
export type CourseId = string;

export interface FacultyAndDepartmentApiResponse {
    id: string;
    name: string;
    code: string;
}

export interface LevelApiResponse {
    id: string;
    name: string;
}
