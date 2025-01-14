import { useRouter, Link } from "expo-router";
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

type AuthType = 'login' | 'signup';

export default function Index() {
  const router = useRouter();


  const navigateToNextPage = (type: AuthType) => {
    if (type === "login") {
      router.push("/login");
    } else if (type === "signup") {
      router.push("/signup");
    } else {
      console.error("Invalid auth type");
    }
  };

  const handleSubmit = (type: AuthType) => {
    navigateToNextPage(type);
  };

  return (
    <VStack className="h-full w-full p-4 justify-center" space="sm">
      <Image source={require('@/assets/images/student.png')} size="full" className="self-center aspect-[384/384] h-1/2" alt="alt"/>

      <Heading size="3xl">Hello!</Heading>
      <Text size="3xl" bold>Create your acount and if you have one login</Text>

      <Center className="gap-y-8">
        <Text size="3xl" bold>
          Get Started?
        </Text>

        <Button className="w-full rounded-full self-center mt-4" size="xl"
        onPress={() => handleSubmit("login")}
        variant="solid">
          <ButtonText size="xl">Login</ButtonText>
        </Button>

        <Button className="w-full rounded-full self-center mt-4" size="xl"
        onPress={() => handleSubmit("signup")}
        variant="outline">
          <ButtonText size="xl">Sign Up</ButtonText>
        </Button>
      </Center>
    </VStack>
  );
}
