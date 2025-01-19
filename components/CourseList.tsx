import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';

interface Course {
    id: number;
    name: string;
    courseCode: string;
    creditUnits: number;
}

interface CourseListProps {
    courses: Course[];
    onDeleteCourses?: (courseIds: number[]) => Promise<void>;
}

const CustomCheckbox = ({ isChecked }: { isChecked: boolean }) => (
    <View
    className={`w-6 h-6 rounded border-2 justify-center items-center ${
        isChecked ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
    }`}
    >
    {isChecked && (
        <Ionicons name="checkmark" size={16} color="white" />
    )}
    </View>
);

const CourseList: React.FC<CourseListProps> = ({
    courses,
    onDeleteCourses = async () => {},
}) => {
    const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);

    const itemHeight = 100;
    const headerHeight = 60;
    const footerHeight = 70;
    const screenHeight = Dimensions.get('window').height;
    const listHeight = Math.min(
    courses.length * itemHeight,
    screenHeight - (headerHeight + footerHeight)
    );

  const toggleCourseSelection = (courseId: number) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedCourses.size === 0) return;

    try {
      setIsDeleting(true);
      await onDeleteCourses(Array.from(selectedCourses));
      setSelectedCourses(new Set());
    } catch (error) {
      console.error('Error deleting courses:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      onPress={() => toggleCourseSelection(item.id)}
      className={`p-4 border-b border-primary-700 ${
        selectedCourses.has(item.id) ? 'bg-primary-0' : ''
      }`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-white">{item.name}</Text>
          <Text className="text-tertiary-100 mt-1">{item.courseCode}</Text>
          <Text className="text-tertiary-100 mt-1">
            Credits: {item.creditUnits}
          </Text>
        </View>
        <CustomCheckbox isChecked={selectedCourses.has(item.id)} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-transparent">
      {/* Header */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-lg font-semibold text-secondary-0">
          Selected: {selectedCourses.size}
        </Text>
      </View>

      {/* Course List */}
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{ height: listHeight }}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Footer with Delete Button */}
      <View className="p-4 border-t border-gray-200">
        <Button
          onPress={handleDeleteSelected}
          isDisabled={selectedCourses.size === 0 || isDeleting}
          className={`px-4 py-3 rounded-lg ${
            selectedCourses.size === 0
              ? 'bg-tertiary-100'
              : isDeleting
              ? 'bg-red-300'
              : 'bg-red-500'
          }`}
        >
          <View className="flex-row justify-center items-center space-x-2">
            <Ionicons
              name="trash-outline"
              size={20}
              color="white"
              className="text-white"
            />
            <Text className="text-white font-medium text-center">
              {isDeleting ? 'Deleting...' : 'Delete Selected'}
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default CourseList;
