export interface Schedule {
    id: string;
    time: string;
    title: string;
    description?: string;
}

export interface ScheduleApiResponse {
    id: string;
    name: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    classroom: string;
    courseTitle: string;
    sessionId: string;
    courseId: string;
    levelId: string;
    departmentId: string;
    classroomId: string;
}

export interface CalendarScheduleProps {
    schedules: ScheduleApiResponse[];
    onSchedulePress?: (schedule: Schedule) => void;
}
