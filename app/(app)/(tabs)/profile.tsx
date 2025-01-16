import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useSession } from "@/hooks/ctx";
import { useState } from 'react';
import { TabBarIcon } from "@/components/TabBarIcon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Alert } from "react-native";
import { Heading } from "@/components/ui/heading";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
  } from '@/components/ui/alert-dialog';

export default function Profile() {
    const { logout } = useSession();
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const handleClose = () => setShowAlertDialog(false)

    return (
        <VStack className="h-full w-full justify-between bg-primary-500 py-10 px-6" space="4xl">
            <Heading size="4xl" className="text-secondary-0" bold>Profile</Heading>

            {/* <Button onPress={handleSignOut}> */}
            <Button onPress={() => setShowAlertDialog(true)}>
                <TabBarIcon name="power-sharp" color={"#D6BD98"} />
                <ButtonText>Sign Out</ButtonText>
            </Button>

        <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
            <AlertDialogBackdrop />
            <AlertDialogContent>
            <AlertDialogHeader>
                <Heading className="text-typography-950 font-semibold" size="md">
                    Sign Out
                </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
                <Text size="sm">Are you sure you want to sign this user out?</Text>
            </AlertDialogBody>
            <AlertDialogFooter className="">
                <Button
                variant="outline"
                action="secondary"
                onPress={handleClose}
                size="sm"
                >
                <ButtonText>Cancel</ButtonText>
                </Button>
                <Button size="sm" onPress={() => logout()}>
                <ButtonText>Log out</ButtonText>
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </VStack>
    )
}