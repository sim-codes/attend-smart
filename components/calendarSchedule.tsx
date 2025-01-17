import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Text } from './ui/text';
import { Ionicons } from '@expo/vector-icons';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addDays,
  getDay
} from 'date-fns';

type Schedule = {
  id: string;
  time: string;
  title: string;
  description?: string;
};

type ScheduleMap = {
  [date: string]: Schedule[];
};

type CalendarScheduleProps = {
  schedules: ScheduleMap;
  onSchedulePress?: (schedule: Schedule) => void;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarSchedule: React.FC<CalendarScheduleProps> = ({ 
  schedules,
  onSchedulePress 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [scheduleHeight] = useState(new Animated.Value(0));

  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(monthEnd, 6 - getDay(monthEnd)); // Align last row properly
  
    const days = eachDayOfInterval({ start: startDate, end: endDate });
  
    return days;
  };

  const formatDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

  const getSchedulesForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return schedules[dateKey] || [];
  };

  const handleDatePress = (date: Date) => {
    if (selectedDate && isSameDay(date, selectedDate)) {
      setSelectedDate(null);
      Animated.timing(scheduleHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setSelectedDate(date);
      Animated.timing(scheduleHeight, {
        toValue: 300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'next' ? 
      addMonths(currentMonth, 1) :
      subMonths(currentMonth, 1)
    );
  };

  return (
    <View className="bg-primary-700 rounded-3xl">
      {/* Calendar Header */}
      <View className="flex-row justify-between items-center p-4 bg-primary-700">
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-secondary-0">
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Ionicons name="arrow-forward-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View className="flex-row justify-around py-2 bg-tertiary-500">
        {WEEKDAYS.map((day) => (
          <Text key={day} className="text-center w-10 text-white">
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="w-full flex-wrap flex-row gap-x-2 items-center">
        {getDaysInMonth().map((date, index) => {
          const hasSchedule = getSchedulesForDate(date).length > 0;
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isCurrentMonth = isSameMonth(date, currentMonth);

          return (
            <TouchableOpacity
              key={date.toString()}
              onPress={() => handleDatePress(date)}
              className={`w-14 h-14 justify-center items-center ${
                isSelected ? 'bg-tertiary-200 rounded-lg' : ''
              }`}
            >
              <Text size='lg'
                className={`text-center ${
                  !isCurrentMonth ? 'text-tertiary-100' :
                  hasSchedule ? 'text-white font-bold' : 'text-secondary-0'
                }`}
              >
                {format(date, 'd')}
              </Text>
              {hasSchedule && isCurrentMonth && (
                <View className="w-1 h-1 bg-white rounded-full mt-1" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Schedule List - Animated Section */}
      <Animated.View style={{ height: scheduleHeight }} className="overflow-hidden">
        {selectedDate && (
          <ScrollView className="flex-1 p-4">
            <Text className="text-lg font-bold mb-2 text-white">
              Schedule for {format(selectedDate, 'MMMM d, yyyy')}
            </Text>
            {getSchedulesForDate(selectedDate).length > 0 ? (
              getSchedulesForDate(selectedDate).map((schedule) => (
                <TouchableOpacity
                  key={schedule.id}
                  onPress={() => onSchedulePress?.(schedule)}
                  className="bg-gray-50 p-4 rounded-lg mb-2"
                >
                  <Text className="font-bold">{schedule.time}</Text>
                  <Text className="text-lg">{schedule.title}</Text>
                  {schedule.description && (
                    <Text className="text-gray-600">{schedule.description}</Text>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View className="bg-gray-50 p-4 rounded-lg">
                <Text className="text-gray-600 text-center">No class schedule for today</Text>
              </View>
            )}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

export default CalendarSchedule;