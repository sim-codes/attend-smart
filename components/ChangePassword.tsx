import { useState } from "react";
import { Pressable } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "@/components/ModalDialog";
import FormFieldComponent from "@/components/forms/FormFieldComponent";
import { ChangePasswordFieldId } from "@/constants/types/profile";
import { changePasswordFormFields } from "@/constants/forms";
import { authService } from "@/services/auth";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@/store/hooks";


export default function ChangePassword() {
    const { user } = useAppSelector((state) => state.auth);
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<ChangePasswordFieldId, string>>>({});
    const [formData, setFormData] = useState<Record<ChangePasswordFieldId, string>>({
        email: user?.email!,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (id: ChangePasswordFieldId) => (value: string) => {
        const trimmedValue = value.replace(/\s/g, '');
        setFormData(prev => ({ ...prev, [id]: trimmedValue }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsLoading(true);

        const payload = {
            email: formData.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        }

        try {
            const response = await authService.changeStudentPassword(payload);
            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Password Changed',
                    text2: 'Your password has been successfully updated!',
                });
                setShowAlertDialog(false);
            }
        } catch (error) {
            setFormError('Failed to update password. Please try again.');
            console.error("Error updating password:", error);
        }
        setFormData({ email: user?.email!, currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsLoading(false);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<ChangePasswordFieldId, string>> = {};
        let isValid = true;

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
            isValid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
            isValid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    return (
        <Pressable onPress={() => setShowAlertDialog(true)}>
            <HStack space="sm" className="items-end">
                <Ionicons name="lock-open-outline" size={28} color="#677D6A" />
                <Text size="xl" className="text-white">Change Password</Text>
            </HStack>

            <ModalDialog
                isOpen={showAlertDialog}
                onClose={() => setShowAlertDialog(false)}
                onAction={handleSubmit}
                title="Change Password"
                actionText="Proceed"
                cancelText="Cancel"
                isLoading={isLoading}
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

                {formError && (
                    <Text size="md" className="text-red-700 text-center" bold>
                        {formError}
                    </Text>
                )}
            </ModalDialog>
        </Pressable>
    )
}
