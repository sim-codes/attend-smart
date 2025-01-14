import { FormFieldProps } from "@/constants/types";
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

const FormFieldComponent = ({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
    helperText,
    errorText,
    isInvalid,
    isRequired,
    isDisabled,
    isReadOnly,
}: FormFieldProps) => {
    return (
        <FormControl
        className="gap-y-1"
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
        >
            <FormControlLabel>
                <FormControlLabelText size="xl">{label}</FormControlLabelText>
            </FormControlLabel>
            <Input className="" size="xl">
                <InputField
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                />
            </Input>
            {helperText && (
                <FormControlHelper>
                    <FormControlHelperText>{helperText}</FormControlHelperText>
                </FormControlHelper>
            )}
            {isInvalid && (
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errorText}</FormControlErrorText>
                </FormControlError>
            )}
        </FormControl>
    );

    function AlertCircleIcon(props: any) {
        return <Feather name="alert-circle" {...props} />;
    }
};

export default FormFieldComponent;