import { Slot } from "expo-router";
import { View, ScrollView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';

export default function AuthLayout(){
    return (
        <View style={{ flex: 1 }}>
            <Slot />
        </View>
    )
}
