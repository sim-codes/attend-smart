import { Text, View } from "react-native";
import { useState } from "react";
import { FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import Feather from '@expo/vector-icons/Feather';


export default function Index() {

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
    <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">

      <Text className="text-lg font-semibold text-primary-500">Sign In</Text>
      <FormControl
        isInvalid={isInvalid}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
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
      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit} variant="solid">
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );

  function AlertCircleIcon(props: any) {
    return <Feather name="alert-circle" {...props} />;
  }
}
