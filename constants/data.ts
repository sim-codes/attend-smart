import { AttendanceRecord } from "@/constants/types/attendance";

export const courses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    courseCode: "CSC 101",
    creditUnits: 3,
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    courseCode: "CSC 201",
    creditUnits: 3,
  },
  {
    id: 3,
    name: "Software Engineering",
    courseCode: "CSC 301",
    creditUnits: 3,
  },
  {
    id: 4,
    name: "Operating Systems",
    courseCode: "CSC 401",
    creditUnits: 3,
  },
  {
    id: 5,
    name: "System Analysis and Design",
    courseCode: "CSC 501",
    creditUnits: 3,
  },
  {
    id: 6,
    name: "Computer Networks",
    courseCode: "CSC 601",
    creditUnits: 3,
  },
  {
    id: 7,
    name: "Database Management Systems",
    courseCode: "CSC 701",
    creditUnits: 3,
  },
  {
    id: 8,
    name: "Web Development",
    courseCode: "CSC 801",
    creditUnits: 3,
  },
  {
    id: 9,
    name: "Mobile App Development",
    courseCode: "CSC 901",
    creditUnits: 3,
  },
  {
    id: 10,
    name: "Cloud Computing",
    courseCode: "CSC 1001",
    creditUnits: 3,
  },
];

export const scheduleData = [
    {
        id: "9e0dd263-aaf5-44d7-5a79-08dd3e3b5e92",
        dayOfWeek: "Friday",
        startTime: "09:30:00",
        endTime: "11:30:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "021ca3c1-0deb-4afd-ae94-2159a8479811",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
    {
        id: "09b54756-7052-444e-5a74-08dd3e3b5e92",
        dayOfWeek: "Monday",
        startTime: "08:00:00",
        endTime: "10:00:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
    {
        id: "756cc682-f007-4068-5a75-08dd3e3b5e92",
        dayOfWeek: "Monday",
        startTime: "10:30:00",
        endTime: "12:30:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "86dba8c0-d178-41e7-938c-ed49778fb52c",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
    {
        id: "6ae20558-3931-4d8a-5a78-08dd3e3b5e92",
        dayOfWeek: "Thursday",
        startTime: "10:00:00",
        endTime: "12:00:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "86dba8c0-d178-41e7-938c-ed49778fb52c",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
    {
        id: "077fb5f1-68c2-4b5a-5a76-08dd3e3b5e92",
        dayOfWeek: "Tuesday",
        startTime: "09:00:00",
        endTime: "11:00:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "021ca3c1-0deb-4afd-ae94-2159a8479811",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
    {
        id: "9407fa3d-14ac-4947-5a77-08dd3e3b5e92",
        dayOfWeek: "Wednesday",
        startTime: "08:30:00",
        endTime: "10:30:00",
        sessionId: "e57b0fbb-6159-4263-91ef-08dd3e3bde3d",
        courseId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
        levelId: "d4d4c053-49b6-410c-bc78-2d54a9991870",
        departmentId: "3d490a70-94ce-4d15-9494-5248280c2ce3",
        classroomId: "c9d4c053-49b6-410c-bc78-2d54a9991870",
    },
];

export const dummyAttendanceRecords: AttendanceRecord[] = [
  // Data Structures Course
  { id: "1", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-10T10:00:00Z", status: "Present" },
  { id: "2", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-12T10:00:00Z", status: "Present" },
  { id: "3", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-17T10:00:00Z", status: "Absent" },
  { id: "4", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-19T10:00:00Z", status: "Present" },
  { id: "5", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-24T10:00:00Z", status: "Present" },
  { id: "6", courseId: "CS201", courseTitle: "Data Structures", recordedAt: "2025-02-26T10:00:00Z", status: "Present" },

  { id: "7", courseId: "CS301", courseTitle: "Database Systems", recordedAt: "2025-02-11T13:00:00Z", status: "Present" },
  { id: "8", courseId: "CS301", courseTitle: "Database Systems", recordedAt: "2025-02-13T13:00:00Z", status: "Present" },
  { id: "9", courseId: "CS301", courseTitle: "Database Systems", recordedAt: "2025-02-18T13:00:00Z", status: "Absent" },
  { id: "10", courseId: "CS301", courseTitle: "Database Systems", recordedAt: "2025-02-20T13:00:00Z", status: "Absent" },
  { id: "11", courseId: "CS301", courseTitle: "Database Systems", recordedAt: "2025-02-25T13:00:00Z", status: "Present" },

  { id: "12", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-12T15:30:00Z", status: "Present" },
  { id: "13", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-14T15:30:00Z", status: "Present" },
  { id: "14", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-19T15:30:00Z", status: "Present" },
  { id: "15", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-21T15:30:00Z", status: "Present" },
  { id: "16", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-26T15:30:00Z", status: "Excused" },
  { id: "17", courseId: "CS401", courseTitle: "Software Engineering", recordedAt: "2025-02-28T15:30:00Z", status: "Present" },
];

export const dummyEnrolledCourses = [
  { courseId: "CS201", title: "Data Structures" },
  { courseId: "CS301", title: "Database Systems" },
  { courseId: "CS401", title: "Software Engineering" },
];
