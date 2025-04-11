import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/forms/FormFieldComponent';
import { Link, useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { signupSteps } from "@/constants/forms";
import { SignupStep, SignupFieldId } from "@/constants/types/auth-forms";
import { Avatar, AvatarImage, AvatarFallbackText } from "@/components/ui/avatar";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";
import { authService } from "@/services/auth";
import { ScrollView } from "react-native";
import imageUploadService from "@/services/imageUpload";

export default function SignUp() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<SignupStep>('personal');
    const [formData, setFormData] = useState<Record<SignupFieldId, string>>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phonenumber: '',
        roles: ''
    });
    const [errors, setErrors] = useState<Partial<Record<SignupFieldId, string>>>({});

    const handleUpload = async () => {
        const imageUrl = await imageUploadService.handleImageUpload();
        if (imageUrl) {
            setImage(imageUrl);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        if (!image) {
            Toast.show({
                type: 'error',
                text1: 'Image Required',
                text2: 'Please upload an image'
            });
            return;
        }

        setLoading(true);

        const payload = {
            firstName: formData.firstname,
            lastName: formData.lastname,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phonenumber,
            profileImageUrl: image ?? "",
            roles: [
                "Student"
            ]
        }

        try {
            await authService.signup(payload);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Account created successfully'
            })

            router.push("/(app)/(auth)/login");
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred. Please try again later'
            })
            throw error;
        }

        setLoading(false);
    }

    const handleChange = (id: SignupFieldId) => (value: string) => {
        const trimmedValue = value.replace(/\s/g, '');
        setFormData(prev => ({ ...prev, [id]: trimmedValue }));

        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateStep = (step: SignupStep): boolean => {
        const newErrors: Partial<Record<SignupFieldId, string>> = {};
        let isValid = true;

        signupSteps[step].fields.forEach(field => {
            const value = formData[field.id];
            if (!value && field.isRequired) {
                newErrors[field.id] = `${field.label} is required`;
                isValid = false;
            }

            // Add specific validations
            switch (field.id) {
                case 'email':
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        newErrors.email = 'Please enter a valid email';
                        isValid = false;
                    }
                    break;
                case 'password':
                    if (value.length < 6) {
                        newErrors.password = 'Password must be at least 6 characters';
                        isValid = false;
                    }
                    break;
                case 'confirmPassword':
                    if (value !== formData.password) {
                        newErrors.confirmPassword = 'Passwords do not match';
                        isValid = false;
                    }
                    break;
                case 'phonenumber':
                    if (!/^\d{11}$/.test(value)) {
                        newErrors.phonenumber = 'Please enter a valid 11-digit phone number';
                        isValid = false;
                    }
                    break;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (!validateStep(currentStep)) return;

        if (currentStep === 'personal') setCurrentStep('account');
        else if (currentStep === 'account') setCurrentStep('contact');
    };

    const handleBack = () => {
        if (currentStep === 'account') setCurrentStep('personal');
        else if (currentStep === 'contact') setCurrentStep('account');
    };

    return (
    <VStack className="h-full w-full justify-between bg-primary-500" space="4xl">
        <VStack className="my-8 p-6">
            <Text size="3xl" className="text-secondary-0">Welcome,</Text>
            <Text size="3xl" className="text-secondary-0" bold>Sign up!</Text>
        </VStack>

            <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-8 py-12 px-4">
                <Pressable onPress={handleUpload} className="gap-y-6">

                    <VStack className="justify-start items-center w-full gap-y-2">
                        <Avatar size="2xl" className=" absolute -top-28 border-4 border-white/20">
                            <AvatarFallbackText>Avatar</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                uri: image
                            }}
                            />
                        </Avatar>
                    </VStack>

                    <Text size="sm" className="text-center" bold>Click to Upload Image</Text>
                </Pressable>

                <ScrollView className="flex-1 gap-y-2" showsVerticalScrollIndicator={false}>
                    <Text className="text-center text-primary-500 uppercase" size="xl" bold>{signupSteps[currentStep].title}</Text>
                        {signupSteps[currentStep].fields.map(field => (
                            <FormFieldComponent
                                key={field.id}
                                {...field}
                                value={formData[field.id]}
                                onChange={handleChange(field.id)}
                                isInvalid={!!errors[field.id]}
                                errorText={errors[field.id]}
                            />
                        ))}

                            {currentStep !== 'personal' && (
                                <Button className="w-full border-primary-500 rounded-full self-center mt-4" size="xl"
                                    onPress={handleBack}
                                    variant="outline">
                                    <ButtonText>Back</ButtonText>
                                </Button>
                            )}

                    <Button className="w-full rounded-full self-center my-2" size="xl"
                        onPress={currentStep === 'contact' ? handleSubmit : handleNext}
                        variant="solid" isDisabled={loading}>
                        <ButtonText>
                            {currentStep === 'contact' ? 'Submit' : 'Next'}
                        </ButtonText>
                    </Button>

                    <Text className="text-center text-primary-500 my-2">
                        Have an account?{" "}
                        <Link href="/(app)/(auth)/login"
                            className="underline text-primary-500 font-bold"
                        >
                            Login
                    </Link>
                    </Text>
                    </ScrollView>

        </VStack>
    </VStack>
    );
}
