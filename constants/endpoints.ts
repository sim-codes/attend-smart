export const API_ENDPOINTS = {
    faculty: {
        getAll: '/faculties',
        getSingle: '/faculties/{id}',
        create: '/faculties',
    },
    level: {
        getAll: '/levels',
        getSingle: '/levels/{id}',
        create: '/levels',
    },
    academicSession: {
        getAll: '/academic-sessions',
        getSingle: '/academic-sessions/{id}',
        create: '/academic-sessions',
        delete: '/academic-sessions/{id}',
    },
    classSchedule: {
        getAll: '/class-schedules',
        getSingle: '/class-schedules/{id}',
        create: '/class-schedules',
        update: '/class-schedules/{id}',
        delete: '/class-schedules/{id}',
    },
    department: {
        getAll: '/faculties/{facultyId}/departments',
        getSingle: '/faculties/{facultyId}/departments/{id}',
        create: '/faculties/{facultyId}/departments',
    },
    course: {
        getAllForDepartment: '/departments/{departmentId}/courses',
        getSingle: '/departments/{departmentId}/courses/{id}',
        createForDepartment: '/departments/{departmentId}/courses',
    },
    authentication: {
        login: '/authentication/login',
        register: '/authentication',
        resetPassword: '/authentication/reset-password',
        changePassword: '/authentication/change-password',
        generateResetToken: '/authentication/generate-reset-token',
        refreshToken: '/token/refresh',
    },
    classroom: {
        getAll: '/faculties/{facultyId}/classrooms',
        getSingle: '/faculties/{facultyId}/classrooms/{id}',
        create: '/faculties/{facultyId}/classrooms',
        delete: '/faculties/{facultyId}/classrooms/{id}',
    },
    profile: {
        getAll: '/profiles',
        getSingle: '/profiles/{id}',
    },
    student: {
        getAll: '/students',
        getSingle: '/students/{id}',
        create: '/students',
        update: '/students/{id}',
    },
    attendance: {
        getAll: '/students',
        getSingle: '/students/{id}',
        sign: '/attendance/{studentId}',
    },
    lecturer: {
        getAll: '/lecturers',
        getSingle: '/lecturers/{id}',
        create: '/lecturers/{id}',
        update: '/lecturers/{id}',
    },
} as const;
