import { Slot, Redirect } from "expo-router";
import { useAppSelector } from "@/store/hooks";


export default function TabLayout(){
    const { isAuthenticated } = useAppSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Redirect href="/start" />;
    }

    return <Slot />
}
