import { Slot } from "expo-router";
import { View, ScrollView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';

export default function AuthLayout(){
    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={{ flex: 1 }}>
                <Slot />
            </View>
        // </TouchableWithoutFeedback>
    )
}
