import { Slot } from "expo-router";
import { Text } from "@/components/ui/text";
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';

export default function AuthLayout(){
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Slot />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
