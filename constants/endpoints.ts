// Define base types
export type Id = string;
export type StudentId = string;
export type FacultyId = string;
export type DepartmentId = string;
export type CourseId = string;

// Define endpoint types for each section
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
