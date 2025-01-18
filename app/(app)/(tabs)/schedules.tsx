import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import CalendarSchedule from "@/components/calendarSchedule";

const scheduleData = {
    '2025-01-17': [
        {
            id: '1',
            time: '11:00 PM',
            title: 'Team Meeting',
            description: 'Weekly sync with the development team'
        },
        {
            id: '2',
            time: '02:00 PM',
            title: 'Client Call',
            description: 'Project status update'
        }
    ],
    '2025-01-20': [
        {
            id: '1',
            time: '12:00 AM',
            title: 'Team Meeting',
            description: 'Weekly sync with the development team'
        },
        {
            id: '2',
            time: '02:00 PM',
            title: 'Client Call',
            description: 'Project status update'
        }
    ]
};

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