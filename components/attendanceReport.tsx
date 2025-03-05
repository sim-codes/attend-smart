import React, { useState, useEffect } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@/store/hooks";
import { Center } from "@/components/ui/center";
import { format } from "date-fns";

// Define attendance record type
interface AttendanceRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string; // ISO date string
  status: string; // 'Present', 'Absent', etc.
  notes?: string;
}

// Define attendance stats type
interface AttendanceStats {
  totalClasses: number;
  present: number;
  absent: number;
  attendancePercentage: number;
}

// Course attendance summary
interface CourseAttendanceSummary {
  courseId: string;
  courseTitle: string;
  classesAttended: number;
  totalClasses: number;
  percentage: number;
}

// DUMMY DATA
const dummyAttendanceRecords: AttendanceRecord[] = [
  // Data Structures Course
  { id: "1", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-10T10:00:00Z", status: "Present" },
  { id: "2", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-12T10:00:00Z", status: "Present" },
  { id: "3", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-17T10:00:00Z", status: "Absent" },
  { id: "4", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-19T10:00:00Z", status: "Present" },
  { id: "5", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-24T10:00:00Z", status: "Present" },
  { id: "6", courseId: "CS201", courseTitle: "Data Structures", date: "2025-02-26T10:00:00Z", status: "Present" },
  
  // Database Systems Course
  { id: "7", courseId: "CS301", courseTitle: "Database Systems", date: "2025-02-11T13:00:00Z", status: "Present" },
  { id: "8", courseId: "CS301", courseTitle: "Database Systems", date: "2025-02-13T13:00:00Z", status: "Present" },
  { id: "9", courseId: "CS301", courseTitle: "Database Systems", date: "2025-02-18T13:00:00Z", status: "Absent" },
  { id: "10", courseId: "CS301", courseTitle: "Database Systems", date: "2025-02-20T13:00:00Z", status: "Absent" },
  { id: "11", courseId: "CS301", courseTitle: "Database Systems", date: "2025-02-25T13:00:00Z", status: "Present" },
  
  // Software Engineering Course
  { id: "12", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-12T15:30:00Z", status: "Present" },
  { id: "13", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-14T15:30:00Z", status: "Present" },
  { id: "14", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-19T15:30:00Z", status: "Present" },
  { id: "15", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-21T15:30:00Z", status: "Present" },
  { id: "16", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-26T15:30:00Z", status: "Excused" },
  { id: "17", courseId: "CS401", courseTitle: "Software Engineering", date: "2025-02-28T15:30:00Z", status: "Present" },
];

// Mock enrolled courses to match the dummy data
const dummyEnrolledCourses = [
  { courseId: "CS201", title: "Data Structures" },
  { courseId: "CS301", title: "Database Systems" },
  { courseId: "CS401", title: "Software Engineering" },
];

const AttendanceReport = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Use dummy enrolled courses instead of fetching from store
  const enrolledCourses = dummyEnrolledCourses;

  const [isLoading, setIsLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalClasses: 0,
    present: 0,
    absent: 0,
    attendancePercentage: 0
  });
  const [courseSummaries, setCourseSummaries] = useState<CourseAttendanceSummary[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use dummy data
      const data = dummyAttendanceRecords;

      setAttendanceRecords(data);

      // Calculate statistics
      const totalClasses = data.length;
      const present = data.filter(record => record.status === 'Present').length;
      const absent = totalClasses - present;
      const attendancePercentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;

      setStats({
        totalClasses,
        present,
        absent,
        attendancePercentage
      });

      // Calculate course summaries
      const courseSummaryMap = new Map<string, CourseAttendanceSummary>();

      enrolledCourses.forEach(course => {
        const courseRecords = data.filter(record => record.courseId === course.courseId);
        const courseClasses = courseRecords.length;
        const coursePresent = courseRecords.filter(record => record.status === 'Present').length;
        const percentage = courseClasses > 0 ? (coursePresent / courseClasses) * 100 : 0;

        courseSummaryMap.set(course.courseId, {
          courseId: course.courseId,
          courseTitle: course.title || 'Unknown Course',
          classesAttended: coursePresent,
          totalClasses: courseClasses,
          percentage
        });
      });

      setCourseSummaries(Array.from(courseSummaryMap.values()));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Attendance records loaded successfully!',
      });
    } catch (error) {
      console.error('Error loading attendance data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while loading attendance records',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present': return 'text-success-500';
      case 'absent': return 'text-error-500';
      default: return 'text-warning-500';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 75) return 'text-success-500';
    if (percentage >= 60) return 'text-warning-500';
    return 'text-error-500';
  };

  const renderCourseItem = ({ item }: { item: CourseAttendanceSummary }) => {
    const isSelected = selectedCourse === item.courseId;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCourse(isSelected ? null : item.courseId)}
        className={`p-4 mb-2 rounded-xl ${isSelected ? 'bg-tertiary-500' : 'bg-primary-600'}`}
      >
        <HStack className="justify-between items-center">
          <VStack>
            <Text bold className="text-secondary-0">{item.courseTitle}</Text>
            <Text className="text-tertiary-100">{item.classesAttended} of {item.totalClasses} classes attended</Text>
          </VStack>
          <Text
            size="xl"
            bold
            className={getPercentageColor(item.percentage)}
          >
            {Math.round(item.percentage)}%
          </Text>
        </HStack>

        {isSelected && attendanceRecords.filter(record => record.courseId === item.courseId).length > 0 && (
          <VStack className="mt-4 border-t border-tertiary-400 pt-2">
            <Text className="text-secondary-0 mb-2" bold>Attendance History:</Text>
            {attendanceRecords
              .filter(record => record.courseId === item.courseId)
              .map(record => (
                <HStack key={record.id} className="justify-between py-1 border-b border-tertiary-400">
                  <Text className="text-white">{format(new Date(record.date), 'MMM dd, yyyy')}</Text>
                  <Text className={getStatusColor(record.status)}>{record.status}</Text>
                </HStack>
              ))}
          </VStack>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <Center className="flex-1 py-8">
      <FontAwesome6 name="calendar-xmark" size={64} color="#677D6A" />
      <Text className="text-tertiary-100 mt-4 text-center">
        No attendance records found.
      </Text>
    </Center>
  );

  return (
    <VStack className="flex-2 bg-primary-500" space="md">
      {/* Stats Section */}
      <VStack className="bg-primary-600 p-4 rounded-xl mb-2">
        <Heading size="md" className="text-secondary-0 mb-2">Attendance Summary</Heading>
        
        <HStack className="justify-between">
          <VStack className="items-center p-2 bg-primary-700 rounded-lg flex-1 mr-2">
            <Text className="text-tertiary-100">Total</Text>
            <Text size="xl" className="text-white" bold>{stats.totalClasses}</Text>
            <Text className="text-tertiary-100">Classes</Text>
          </VStack>
          
          <VStack className="items-center p-2 bg-primary-700 rounded-lg flex-1 mx-1">
            <Text className="text-tertiary-100">Present</Text>
            <Text size="xl" className="text-success-500" bold>{stats.present}</Text>
            <Text className="text-tertiary-100">Classes</Text>
          </VStack>
          
          <VStack className="items-center p-2 bg-primary-700 rounded-lg flex-1 ml-2">
            <Text className="text-tertiary-100">Absent</Text>
            <Text size="xl" className="text-error-500" bold>{stats.absent}</Text>
            <Text className="text-tertiary-100">Classes</Text>
          </VStack>
        </HStack>

        <HStack className="mt-4 items-center">
          <Text className="text-white mr-2">Overall Attendance:</Text>
          <Text
            size="xl"
            bold
            className={getPercentageColor(stats.attendancePercentage)}
          >
            {Math.round(stats.attendancePercentage)}%
          </Text>
        </HStack>
      </VStack>

      {/* Course Attendance Section */}
      <Heading size="md" className="text-secondary-0">Course Attendance</Heading>

      {isLoading ? (
        <Center className="flex-1">
          <Text className="text-tertiary-100">Loading attendance data...</Text>
        </Center>
      ) : (
        <FlatList
          data={courseSummaries}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.courseId}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      {/* Refresh Button */}
      <Button
        variant="link"
        onPress={fetchAttendanceData}
        isDisabled={isLoading}
        className="self-center mt-2"
      >
        <HStack space="sm" className="items-center">
          <Ionicons name="refresh-outline" size={18} color="#D6BD98" />
          <ButtonText className="text-secondary-0">Refresh Data</ButtonText>
        </HStack>
      </Button>
    </VStack>
  );
};

export default AttendanceReport;
