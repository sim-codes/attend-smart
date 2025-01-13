import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/FormFieldComponent ';
import { Link } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { loginFormFields } from "@/constants/forms";
import { LoginFieldId } from "@/types";

export default function Login() {
  const [formData, setFormData] = useState<Record<LoginFieldId, string>>({
    email: '',
    password: ''
  });

  const handleChange = (id: LoginFieldId) => (value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
};

  const handleSubmit = () => {
    alert("Login button clicked1");
  }

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
          />
      ))}


      <Link href="/(auth)/forget-password"
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
        <Link href="/(auth)/signup"
          className="underline text-primary-500 font-bold text-lg"
        >
          Sign up
        </Link>
      </Text>

      </VStack>
    </VStack>
  );
}
