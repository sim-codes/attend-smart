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
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";


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
    <VStack className="h-full w-full p-4 justify-center" space="sm">
      <Image source={require('@/assets/images/student.png')} size="full" className="self-center aspect-[384/384] h-1/2" alt="alt"/>

      <Heading size="3xl">Hello!</Heading>
      <Text size="3xl" bold>Create your acount and if you have one login</Text>

      <Center className="gap-y-8">
        <Text size="3xl" bold>Get Started?</Text>

        <Button className="w-full rounded-full self-center mt-4" size="xl" onPress={handleSubmit} variant="solid">
          <ButtonText size="xl">Login</ButtonText>
        </Button>

        <Button className="w-full rounded-full self-center mt-4" size="xl" onPress={handleSubmit} variant="outline">
          <ButtonText size="xl">Sign Up</ButtonText>
        </Button>
      </Center>
    </VStack>
  );

  function AlertCircleIcon(props: any) {
    return <Feather name="alert-circle" {...props} />;
  }
}
