import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
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
import { AttendanceStats, CourseAttendanceSummary, AttendanceRecord } from "@/constants/types/attendance";
import { dummyAttendanceRecords, dummyEnrolledCourses } from "@/constants/data";


const AttendanceReport = () => {
  const { user } = useAppSelector((state) => state.auth);

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
