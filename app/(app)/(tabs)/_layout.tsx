import { Slot, Redirect } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { Text } from "@/components/ui/text";

export default function TabLayout(){
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        return <Redirect href="/start" />;
    }

    return <Slot />
}
