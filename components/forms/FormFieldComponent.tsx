import { FormFieldProps } from '@/constants/types/forms';
import {
    FormControl,
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
import Dropdown from '@/components/forms/Dropdown';
import { Option } from '@/constants/types/common';

interface EnhancedFormFieldProps extends FormFieldProps {
    options?: Option[];
}

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
    options = [],
}: EnhancedFormFieldProps) => {
    return (
        <FormControl
            className="gap-y-1"
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
        >
            <FormControlLabel>
                <FormControlLabelText size="lg">{label}</FormControlLabelText>
            </FormControlLabel>

            {type === 'select' ? (
                <Dropdown
                    options={options}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    error={isInvalid ? errorText : undefined}
                    disabled={isDisabled || isReadOnly}
                />
            ) : (
                <Input className="" size="xl">
                    <InputField
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={(text) => onChange(text)}
                    />
                </Input>
            )}

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
        return <Feather name="alert-circle" color='#8B0000' {...props} />;
    }
};

export default FormFieldComponent;
