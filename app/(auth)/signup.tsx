import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/FormFieldComponent ';
import { Link } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { signupFormFields } from "@/constants/forms";


export default function SignUp() {

    const [formData, setFormData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = () => {
        alert("Login button clicked1");
    }

    const handleChange = (id: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
    <VStack className="h-full w-full justify-between bg-primary-500" space="4xl">
        <VStack className="my-6 p-6">
            <Text size="4xl" className="text-secondary-0">Welcome,</Text>
            <Text size="4xl" className="text-secondary-0" bold>Sign up!</Text>
        </VStack>

        <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-14 py-12 px-4">

            {signupFormFields.map(field => (
            <FormFieldComponent
                key={field.id}
                {...field}
                value={formData[field.id]}
                onChange={handleChange(field.id)}
            />
            ))}

            <Button className="w-full rounded-full self-center mt-4" size="xl"
                onPress={() => handleSubmit()}
                variant="solid">
                <ButtonText size="xl">Sign up</ButtonText>
            </Button>

            <Text className="text-center text-primary-500" size="lg">
            Have an account?{" "}
            <Link href="/(auth)/login"
                className="underline text-primary-500 font-bold text-lg"
            >
                Login
            </Link>
            </Text>

        </VStack>
    </VStack>
    );
}
