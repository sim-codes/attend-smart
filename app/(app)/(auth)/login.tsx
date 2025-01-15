import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/FormFieldComponent ';
import { Link, useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { loginFormFields } from "@/constants/forms";
import { LoginFieldId } from "@/constants/types";
import { useSession } from "@/hooks/ctx";

export default function Login() {
  const router = useRouter();
  const { signIn } = useSession();

  const [formData, setFormData] = useState<Record<LoginFieldId, string>>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<Record<LoginFieldId, string>>>({});

  const handleChange = (id: LoginFieldId) => (value: string) => {
    const trimmedValue = value.replace(/\s/g, '');
    setFormData(prev => ({ ...prev, [id]: trimmedValue }));
    if (errors[id]) {
        setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    signIn(formData);
    router.push("/");
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<LoginFieldId, string>> = {};
    let isValid = true;

    if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        isValid = false;
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
    } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <VStack className="h-full w-full justify-between bg-primary-500" space="4xl">
      <VStack className="my-6 p-6">
        <Text size="4xl" className="text-secondary-0">Welcome Back,</Text>
        <Text size="4xl" className="text-secondary-0" bold>Log In!</Text>
      </VStack>

      <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-14 py-12 px-4">

      {loginFormFields.map(field => (
          <FormFieldComponent
              key={field.id}
              {...field}
              value={formData[field.id]}
              onChange={handleChange(field.id)}
              isInvalid={!!errors[field.id]}
              errorText={errors[field.id]}
          />
      ))}


      <Link href="/(app)/(auth)/forget-password"
        className="self-end underline text-primary-500 font-bold text-lg"
      >
        Forgot Password?
      </Link>

      <Button className="w-full rounded-full self-center mt-4" size="xl"
        onPress={() => handleSubmit()}
        variant="solid">
        <ButtonText size="xl">Log In</ButtonText>
      </Button>

      <Text className="text-center text-primary-500" size="lg">
        Don't have an account?{" "}
        <Link href="/(app)/(auth)/signup"
          className="underline text-primary-500 font-bold text-lg"
        >
          Sign up
        </Link>
      </Text>

      </VStack>
    </VStack>
  );
}