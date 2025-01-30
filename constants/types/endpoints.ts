import { Id, FacultyId, DepartmentId, CourseId, StudentId } from '@/constants/types/api';

export type FacultyEndpoints = {
    getAll: '/faculties';
    getSingle: `/faculties/${Id}`;
    create: '/faculties';
}

export type LevelEndpoints = {
    getAll: '/levels';
    getSingle: `/levels/${Id}`;
    create: '/levels';
}

export type ClassScheduleEndpoints = {
    getAll: '/class-schedules';
    getAllByCourseIds: '/class-schedules/courses';
    getSingle: `/class-schedules/${Id}`;
    create: '/class-schedules';
    update: `/class-schedules/${Id}`;
    delete: `/class-schedules/${Id}`;
}

export type DepartmentEndpoints = {
    getAll: `/faculties/${FacultyId}/departments`;
    getSingle: `/faculties/${FacultyId}/departments/${Id}`;
    create: `/faculties/${FacultyId}/departments`;
}

export type CourseEndpoints = {
    getAllForDepartment: `/departments/${DepartmentId}/courses`;
    getSingle: `/departments/${DepartmentId}/courses/${Id}`;
    createForDepartment: `/departments/${DepartmentId}/courses`;
}

export type AuthenticationEndpoints = {
    login: '/authentication/login';
    register: '/authentication';
    resetPassword: '/authentication/reset-password';
    changePassword: '/authentication/change-password';
    generateResetToken: '/authentication/generate-reset-token';
    refreshToken: '/token/refresh';
}

export type StudentEndpoints = {
    getAll: '/students';
    getSingle: `/students/${Id}`;
    create: `/students/${Id}`;
    update: `/students/${Id}`;
}

export type AttendanceEndpoints = {
    getAll: '/students';
    getSingle: `/students/${Id}`;
    sign: `/attendance/${StudentId}`;
    signWithoutLocation: `/attendance/${StudentId}/signin`;
}

export type EnrollmentEndpoints = {
    getAll: `/enrollments/${StudentId}`;
    getSingle: `/enrollments/${StudentId}/${CourseId}`;
    create: `/enrollments/${StudentId}`;
    delete: `/enrollments/${StudentId}/${CourseId}`;
}
