import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import CalendarSchedule from "@/components/calendarSchedule";
import { scheduleData } from "@/constants/data";

export default function Schedules() {
    const handleSchedulePress = (schedule: any ) => {
        console.log('Schedule pressed:', schedule);
        // Handle schedule selection
    };
    return (
        <VStack className="h-full w-full bg-primary-500 py-10 px-6" space="4xl">
            <Text size="4xl" className="text-secondary-0" bold>Schedules</Text>

            <CalendarSchedule
            schedules={scheduleData}
            onSchedulePress={handleSchedulePress}
            />
        </VStack>
    )
}