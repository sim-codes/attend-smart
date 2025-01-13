import { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import FormFieldComponent from '@/components/FormFieldComponent ';
import { Link } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert("Login button clicked1");
  }
  return (
    <VStack className="h-full w-full justify-between bg-primary-500" space="4xl">
      <VStack className="my-6 p-6">
        <Text size="4xl" className="text-secondary-0">Welcome Back,</Text>
        <Text size="4xl" className="text-secondary-0" bold>Forgot password?</Text>
      </VStack>

      <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-14 py-12 px-4">

      <FormFieldComponent
          label="Email"
          placeholder="Enter your email"
          type = 'text'
          value={email}
          onChange={setEmail}
      />

      <Button className="w-full rounded-full self-center mt-4" size="xl"
        onPress={() => handleSubmit()}
        variant="solid">
        <ButtonText size="xl">Reset Password</ButtonText>
      </Button>

      <Text className="text-center text-primary-500" size="lg">
        Remember the password?{" "}
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