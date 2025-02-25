import { useState, useEffect } from 'react';
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
  getDay,
  getDaysInMonth as getDaysInMonthUtil
} from 'date-fns';
import { CalendarScheduleProps } from '@/constants/types/schedule';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CalendarSchedule = ({ schedules, onSchedulePress }: CalendarScheduleProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [scheduleHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    // Automatically select current date on component mount
    const today = new Date();
    handleDatePress(today);
  }, []);

  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(monthEnd, 6 - getDay(monthEnd));

    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const getSchedulesForDate = (date: Date) => {
    const dayOfWeek = WEEKDAYS[date.getDay()];
    return schedules.filter(schedule =>
      schedule.dayOfWeek === dayOfWeek && isSameMonth(date, currentMonth)
    ).map(schedule => ({
      id: schedule.id,
      time: `Time: ${schedule.startTime} - ${schedule.endTime}`,
      title: `Course: ${schedule.courseTitle}`,
      description: `Classroom: ${schedule.classroom}`
    }));
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

  const getWeeksInMonth = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let days = eachDayOfInterval({ start: startDate, end: endDate });
    let weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  };

  const weeks = getWeeksInMonth(currentMonth);
  const lastWeek = weeks[weeks.length - 1];
  const shouldJustifyBetween = lastWeek.length <= 6;

  return (
    <View className="bg-primary-700 rounded-xl pb-2">
      {/* Calendar Header */}
      <View className="flex-row justify-between rounded-3xl items-center p-4 bg-primary-700">
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
            {day.substring(0, 3)}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View className="w-full">
      {weeks.map((week, weekIndex) => (
        <View
        key={weekIndex}
        className={`flex-row gap-x-2 items-end p-2 justify-between`}
        >
          {week.map((date, dayIndex) => {
            if (!date) {
              return <View key={dayIndex} className="w-10 h-10" />;
            }

            const hasSchedule = getSchedulesForDate(date).length > 0;
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isToday = isSameDay(date, new Date());

            return (
              <TouchableOpacity
                key={date.toString()}
                onPress={() => handleDatePress(date)}
                className={`w-10 h-10 justify-center items-center ${
                  isToday ? 'bg-tertiary-100 rounded-lg' :
                  isSelected ? 'bg-tertiary-200 rounded-lg' : ''
                }`}
              >
                <Text size='lg'
                  className={`text-center ${
                    !isCurrentMonth ? 'text-tertiary-100' :
                    hasSchedule ? 'text-white font-bold' :
                    isToday ? 'text-white font-bold' : 'text-secondary-0'
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
      ))}
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
