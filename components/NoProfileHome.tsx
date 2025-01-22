import { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { FontAwesome6 } from "@expo/vector-icons";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./FormFieldComponent ";
import { ProfileStep, ProfileFieldId } from "@/constants/types";
import { profileSteps } from '../constants/forms';
import { facultyService } from "@/services/faculty";
import { Text } from "./ui/text";

export default function NoProfileHome(){
    const [ showDialog, setShowDialog ] = useState(false)
        const [currentStep, setCurrentStep] = useState<ProfileStep>('faculty');
    const [formData, setFormData] = useState<Record<ProfileFieldId, string>>({
        matriculationNumber: "",
        level: "",
        department: "",
        faculty: ""
    });
    const [errors, setErrors] = useState<Partial<Record<ProfileFieldId, string>>>({});

    const handleChange = (id: ProfileFieldId) => (value: string) => {
        const trimmedValue = value.replace(/\s/g, '');
        setFormData(prev => ({ ...prev, [id]: trimmedValue }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleNext = () => {
        if (currentStep === 'faculty') setCurrentStep('details');
    };

    const handleBack = () => {
        if (currentStep === 'details') setCurrentStep('faculty');
    };

    async function faculties(){
        const { data } = await facultyService.getFaculties();

        console.log(data)
    }


    return (
        <VStack className="flex-1 justify-center" space="lg">
            <Image source={require('@/assets/images/student.png')} size="full" className="self-center aspect-[384/384] h-2/3" alt="alt"/>
            <Heading className="text-white text-center" size="xl">You haven't set up your student profile yet</Heading>
            <Button variant="outline" className="w-full gap-x-2" size="xl" onPress={() => {
                faculties()
                setShowDialog(true)
            }
                }>
                <FontAwesome6 name="user" size={28} color="#D6BD98" />
                <ButtonText className="text-secondary-0">Let's do that</ButtonText>
            </Button>

            <ModalDialog
                isOpen={showDialog}
                onClose={currentStep === 'faculty' ? () => setShowDialog(false) : handleBack}
                onAction={currentStep === 'details' ? () => {} : handleNext}
                title="Create your student profile"
                actionText={currentStep === 'details' ? 'Submit' : 'Next'}
                cancelText={currentStep === 'faculty' ? 'Cancel' : 'Back'}
            >
                {profileSteps[currentStep].fields.map(field => (
                    <FormFieldComponent
                        key={field.id}
                        {...field}
                        value={formData[field.id]}
                        onChange={handleChange(field.id)}
                        isInvalid={!!errors[field.id]}
                        errorText={errors[field.id]}
                    />
                ))}
            </ModalDialog>
        </VStack>
    );
};
