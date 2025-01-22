import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import {Button, ButtonText} from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ConfirmDialogProps } from '@/constants/types';



const ModalDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onAction,
    title = 'Action Dialog',
    actionText = 'Proceed',
    cancelText = 'Cancel',
    children,
    size = 'md',
}) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} size={size}>
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                <Heading size="lg" className="text-typography-950 font-semibold">
                    {title}
                </Heading>
                </AlertDialogHeader>

                <AlertDialogBody className="mt-3 mb-4">
                {typeof children === 'string' ? (
                    <Text size="sm">{children}</Text>
                ) : (
                    children
                )}
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button
                    variant="outline"
                    action="secondary"
                    onPress={onClose}
                    size="sm"
                    className="mr-3"
                >
                    <ButtonText>{cancelText}</ButtonText>
                </Button>
                <Button
                    size="sm"
                    onPress={() => {
                    onAction();
                    // onClose();
                    }}
                >
                    <ButtonText>{actionText}</ButtonText>
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalDialog;
