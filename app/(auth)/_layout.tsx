import { Slot } from "expo-router";
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';

export default function AuthLayout(){
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <Slot />
            </View>
        </TouchableWithoutFeedback>
    )
}
