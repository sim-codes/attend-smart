import { useState } from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import FormFieldComponent from '@/components/forms/FormFieldComponent';
import { Link, useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { loginFormFields } from "@/constants/forms";
import { LoginFieldId } from "@/constants/types/auth-forms";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { authService } from "@/services/auth";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<Record<LoginFieldId, string>>({
    username: '',
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

  const handleLogin = async () => {
    if (!validateForm()) return;
    dispatch(loginStart());

    const {data, success, error} = await authService.login(formData);

    if (success) {
      dispatch(loginSuccess({
        user: data?.user!,
        accessToken: data?.token.accessToken!,
        refreshToken: data?.token.refreshToken!,
      }));
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in!',
      });
      router.push('/');
      return;
    }

    dispatch(loginFailure(error?.message!));
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error?.message!,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<LoginFieldId, string>> = {};
    let isValid = true;

    if (!formData.username) {
        newErrors.username = 'Email is required';
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
      <VStack className="my-8 p-6">
        <Text size="4xl" className="text-secondary-0">Welcome Back,</Text>
        <Text size="4xl" className="text-secondary-0" bold>Log In!</Text>
      </VStack>

      <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-8 py-12 px-4">

        <ScrollView className="flex-1 gap-y-2">
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

      {error && (
          <Text size="md" className="text-red-700 text-center" bold>
              {error}
          </Text>
      )}
      <Link href="/(app)/(auth)/forget-password"
        className="self-end underline text-primary-500 font-bold text-lg"
      >
        Forgot Password?
      </Link>

      <Button className="w-full rounded-full self-center mt-4" size="xl"
        onPress={() => handleLogin()}
        variant="solid" isDisabled={isLoading}>
        <ButtonText size="xl">{isLoading ? "Loading..." : "Login"}</ButtonText>
      </Button>

      <Text className="text-center text-primary-500" size="lg">
        Don't have an account?{" "}
        <Link href="/(app)/(auth)/signup"
          className="underline text-primary-500 font-bold text-lg"
        >
          Sign up
        </Link>
          </Text>
          </ScrollView>

      </VStack>
    </VStack>
  );
}
