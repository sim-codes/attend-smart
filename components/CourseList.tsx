import { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { CourseListProps, Course } from '@/constants/types';
import CustomCheckbox from '@/components/CheckBox';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';

const CourseList = ({courses, onDeleteCourses = async () => {}}: CourseListProps) => {
    const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);

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

    const calculateTotalUnits = () => {
        return courses.reduce((total, course) => total + course.creditUnits, 0);
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
                selectedCourses.has(item.id) ? 'bg-secondary-0/20' : ''
            }`}
        >
            <HStack className="justify-between items-start">
                <VStack className="flex-1">
                    <Text size="lg" className="font-semibold text-white">{item.name}</Text>
                    <Text className="text-tertiary-100 mt-1">{item.courseCode}</Text>
                    <Text className="text-tertiary-100 mt-1">
                        Credits: {item.creditUnits}
                    </Text>
                </VStack>
                <CustomCheckbox isChecked={selectedCourses.has(item.id)} />
            </HStack>
        </TouchableOpacity>
    );

    const renderEmptyComponent = () => (
        <VStack className="flex-1 justify-center items-center p-4">
            <Text className="text-tertiary-100 text-center" size="lg">
                You have not registered for any courses yet.
            </Text>
        </VStack>
    );

    return (
        <View className="flex-1 bg-transparent">
            {/* Header */}
            <VStack className="p-4 border-b border-gray-200">
                <Text className="text-white mb-2 text-center" size="2xl" bold>
                    {courses.length}
                    {" "}Registered Courses
                </Text>
                <HStack className="justify-between items-center">
                    <Text size='lg' className="font-semibold text-secondary-0">
                        Total Units: {calculateTotalUnits()}
                    </Text>
                    <Text size='lg' className="font-semibold text-secondary-0">
                        Selected: {selectedCourses.size}
                    </Text>
                </HStack>
            </VStack>

            {/* Course List */}
            <FlatList
                data={courses}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={{ flexGrow: 1 }}
            />

            {/* Footer with Delete Button */}
            <View className="p-4 border-t border-gray-200">
                <Button size='xl'
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
