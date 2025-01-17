import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Calendar } from "react-native-calendars";

export default function Schedules() {
    return (
        <VStack className="h-full w-full justify-between bg-primary-500 py-10 px-6" space="4xl">
            <Text size="4xl" className="text-secondary-0" bold>Schedules</Text>

            <Calendar />
        </VStack>
    )
}