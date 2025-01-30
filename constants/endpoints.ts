import { CourseId, DepartmentId, FacultyId, Id, StudentId } from './types';

// Define the actual endpoints object with type-safe functions
export const API_ENDPOINTS = {
    faculty: {
        getAll: '/faculties',
        getSingle: (id: Id) => `/faculties/${id}`,
        create: '/faculties',
    },
    level: {
        getAll: '/levels',
        getSingle: (id: Id) => `/levels/${id}`,
        create: '/levels',
    },
    classSchedule: {
        getAll: '/class-schedules',
        getAllByCourseIds: '/class-schedules/courses',
        getSingle: (id: Id) => `/class-schedules/${id}`,
        create: '/class-schedules',
        update: (id: Id) => `/class-schedules/${id}`,
        delete: (id: Id) => `/class-schedules/${id}`,
    },
    department: {
        getAll: (facultyId: FacultyId) => `/faculties/${facultyId}/departments`,
        getSingle: (facultyId: FacultyId, id: Id) => `/faculties/${facultyId}/departments/${id}`,
        create: (facultyId: FacultyId) => `/faculties/${facultyId}/departments`,
    },
    course: {
        getAllForDepartment: (departmentId: DepartmentId) => `/departments/${departmentId}/courses`,
        getSingle: (departmentId: DepartmentId, id: Id) => `/departments/${departmentId}/courses/${id}`,
        createForDepartment: (departmentId: DepartmentId) => `/departments/${departmentId}/courses`,
    },
    authentication: {
        login: '/authentication/login',
        register: '/authentication',
        resetPassword: '/authentication/reset-password',
        changePassword: '/authentication/change-password',
        generateResetToken: '/authentication/generate-reset-token',
        refreshToken: '/token/refresh',
    },
    student: {
        getAll: '/students',
        getSingle: (id: Id) => `/students/${id}`,
        create: (id: Id) => `/students/${id}`,
        update: (id: Id) => `/students/${id}`,
    },
    attendance: {
        getAll: '/students',
        getSingle: (id: Id) => `/students/${id}`,
        sign: (studentId: StudentId) => `/attendance/${studentId}`,
        signWithoutLocation: (studentId: StudentId) => `/attendance/${studentId}/signin`,
    },
    enrollment: {
        getAll: (studentId: StudentId) => `/enrollments/${studentId}`,
        getSingle: (studentId: StudentId, courseId: CourseId) => `/enrollments/${studentId}/${courseId}`,
        create: (studentId: StudentId) => `/enrollments/${studentId}`,
        delete: (studentId: StudentId, courseId: CourseId) => `/enrollments/${studentId}/${courseId}`,
    },
} as const;

// Update PUBLIC_ENDPOINTS to use the new structure
export const PUBLIC_ENDPOINTS = [
    API_ENDPOINTS.authentication.login,
    API_ENDPOINTS.authentication.register
] as const;
