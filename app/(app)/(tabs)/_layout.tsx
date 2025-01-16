import { Slot, Redirect } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { Text } from "@/components/ui/text";

export default function TabLayout(){
    const { loading, isAuthenticated } = useSession();

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!isAuthenticated) {
        return <Redirect href="/start" />;
    }

    return <Slot />
}
