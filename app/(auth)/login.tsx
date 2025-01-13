import { useState } from "react";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlErrorIcon,
} from '@/components/ui/form-control';

import { Input, InputField } from '@/components/ui/input';
import Feather from '@expo/vector-icons/Feather';

export default function Login() {

  const [isInvalid, setIsInvalid] = useState(false)
  const [inputValue, setInputValue] = useState("12345")
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }

  return (
    <VStack className="h-full w-full justify-between bg-primary-500" space="xl">
      <VStack className="p-6">
        <Text size="3xl" className="text-secondary-0">Welcome Back,</Text>
        <Text size="3xl" className="text-secondary-0" bold>Log In!</Text>
      </VStack>

      <VStack className="bg-secondary-0/70 h-full rounded-t-[5rem] p-6">
        <FormControl
          className="w-full py-6"
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="lg">
            <InputField
              type="password"
              placeholder="password"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be atleast 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
    </VStack>
  );

  function AlertCircleIcon(props: any) {
    return <Feather name="alert-circle" {...props} />;
  }
}