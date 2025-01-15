import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/FormFieldComponent ';
import { Link, useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { signupSteps } from "@/constants/forms";
import { SignupStep, SignupFieldId } from '@/constants/types';


export default function SignUp() {
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

    const handleSubmit = () => {
        if (!validateStep(currentStep)) return;

        router.push("/login");
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
        <VStack className="my-6 p-6">
            <Text size="4xl" className="text-secondary-0">Welcome,</Text>
            <Text size="4xl" className="text-secondary-0" bold>Sign up!</Text>
        </VStack>

        <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-14 py-12 px-4">

        <Text className="text-center text-primary-500 uppercase" size="3xl" bold>{signupSteps[currentStep].title}</Text>
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
                        <ButtonText size="xl">Back</ButtonText>
                    </Button>
                )}

            <Button className="w-full rounded-full self-center" size="xl"
                onPress={currentStep === 'contact' ? handleSubmit : handleNext}
                variant="solid">
                <ButtonText size="xl">
                    {currentStep === 'contact' ? 'Submit' : 'Next'}
                </ButtonText>
            </Button>

            <Text className="text-center text-primary-500" size="lg">
            Have an account?{" "}
            <Link href="/(app)/(auth)/login"
                className="underline text-primary-500 font-bold text-lg"
            >
                Login
            </Link>
            </Text>

        </VStack>
    </VStack>
    );
}
