import { useState } from "react";
import { Pressable } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "@/components/ModalDialog";
import { useSession } from "@/hooks/ctx";
import FormFieldComponent from "@/components/FormFieldComponent";
import { ChangePasswordFieldId, ChangePasswordFormField } from "@/constants/types";
import { changePasswordFormFields } from "@/constants/forms";

export default function ChangePassword() {
    const { user } = useSession();
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [formError, setFormError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<ChangePasswordFieldId, string>>>({});
    const [formData, setFormData] = useState<Record<ChangePasswordFieldId, string>>({
        email: user?.email!,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (id: ChangePasswordFieldId) => (value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    return (
        <Pressable onPress={() => setShowAlertDialog(true)}>
            <HStack space="sm" className="items-end">
                <Ionicons name="lock-open-outline" size={28} color="#677D6A" />
                <Text size="xl" className="text-white">Change Password</Text>
            </HStack>

            <ModalDialog
                isOpen={showAlertDialog}
                onClose={() => setShowAlertDialog(false)}
                onAction={() => {}}
                title="Change Password"
                actionText="Proceed"
                cancelText="Cancel"
            >
                {
                    changePasswordFormFields.map(field => (
                        <FormFieldComponent
                            key={field.id}
                            {...field}
                            value={formData[field.id]}
                            onChange={handleChange(field.id)}
                            isInvalid={!!errors[field.id]}
                            errorText={errors[field.id]}
                        />
                    ))
                }
            </ModalDialog>
        </Pressable>
    )
}
