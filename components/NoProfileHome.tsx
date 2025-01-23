import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { FontAwesome6 } from "@expo/vector-icons";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./FormFieldComponent";
import {
    ProfileStep,
    ProfileFieldId,
    FacultyAndDepartmentApiResponse
} from "@/constants/types";
import { createProfileSteps } from '../constants/forms';
import { facultyService } from "@/services/faculty";
import { levelService } from "@/services/level";
import { departmentService } from "@/services/department";
import { Text } from "./ui/text";
import { createOptionsFromResponse } from "@/hooks/createOptions";
import { ProfileCreationFormFields } from '../constants/types';
import { studentService } from "@/services/student";
import { useSession } from "@/hooks/ctx";
import { useApp } from "@/hooks/appContext";
import Toast from 'react-native-toast-message';

export default function NoProfileHome() {
    const { user } = useSession();
    const { updateProfile } = useApp()
    // Form state
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState<ProfileStep>('faculty');

    // Data state
    const [steps, setSteps] = useState<ProfileCreationFormFields | undefined>(undefined);
    const [facultiesData, setFacultiesData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [departmentsData, setDepartmentsData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [levelsData, setLevelsData] = useState<any[] | null>(null);

    // Form data and errors
    const [formData, setFormData] = useState<Record<ProfileFieldId, string>>({
        matriculationNumber: "",
        level: "",
        department: "",
        faculty: ""
    });
    const [errors, setErrors] = useState<Partial<Record<ProfileFieldId, string>>>({});

    // Validation rules
    const validationRules = {
        faculty: (value: string) => {
            if (!value) return "Faculty is required";
            return "";
        },
        department: (value: string) => {
            if (!value) return "Department is required";
            return "";
        },
        level: (value: string) => {
            if (!value) return "Level is required";
            return "";
        },
        matriculationNumber: (value: string) => {
            if (!value) return "Matriculation number is required";
        return "";
        }
    };

    // Load initial data
    useEffect(() => {
        if (showDialog) {
        loadInitialData();
        }
    }, [showDialog]);

    // Load departments when faculty changes
    useEffect(() => {
        if (formData.faculty) {
        loadDepartments(formData.faculty);
        }
    }, [formData.faculty]);

    // Update form steps when data changes
    useEffect(() => {
        if (facultiesData && levelsData) {
        updateFormSteps();
        }
    }, [facultiesData, levelsData, departmentsData]);

    const loadInitialData = async () => {
        try {
        const [facultiesResponse, levelsResponse] = await Promise.all([
            facultyService.getFaculties(),
            levelService.getAllLevels()
        ]);

        if (facultiesResponse.success) {
            setFacultiesData(facultiesResponse.data!);
            setLevelsData(levelsResponse.data!);
        }
        } catch (error) {
        console.error("Error loading initial data:", error);
        }
    };

    const loadDepartments = async (facultyId: string) => {
        try {
        const { data, success } = await departmentService.getDepartmentsByFaculty(facultyId);
        if (success) {
            setDepartmentsData(data!);
        }
        } catch (error) {
        console.error("Error loading departments:", error);
        }
    };

    const updateFormSteps = () => {
        const facultyOptions = createOptionsFromResponse(facultiesData!, "id", "name");
        const levelOptions = createOptionsFromResponse(levelsData!, "id", "name");
        const departmentOptions = departmentsData
        ? createOptionsFromResponse(departmentsData, "id", "name")
        : [];

        const steps = createProfileSteps(facultyOptions, departmentOptions, levelOptions);
        setSteps(steps!);
    };

    const handleChange = (id: ProfileFieldId) => (value: string) => {
        const trimmedValue = value.trim();
        setFormData(prev => ({ ...prev, [id]: trimmedValue }));

        // Clear dependent fields when faculty changes
        if (id === 'faculty') {
        setFormData(prev => ({ ...prev, department: '' }));
        setDepartmentsData(null);
        }

        // Clear error when field changes
        if (errors[id]) {
        setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateStep = (): boolean => {
        const currentFields = steps?.[currentStep].fields || [];
        const newErrors: Partial<Record<ProfileFieldId, string>> = {};

        currentFields.forEach(field => {
        const validationRule = validationRules[field.id];
        if (validationRule) {
            const error = validationRule(formData[field.id]);
            if (error) {
            newErrors[field.id] = error;
            }
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
        if (currentStep === 'faculty') {
            setCurrentStep('details');
        }
        }
    };

    const handleBack = () => {
        if (currentStep === 'details') {
        setCurrentStep('faculty');
        }
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);
        try {
        const payload = {
            matriculationNumber: formData.matriculationNumber,
            levelId: formData.level,
            departmentId: formData.department
        };

        const { data } = await studentService.createStudentProfile(user?.id!, payload);
        updateProfile(data!);
        setShowDialog(false);
        Toast.show({
          type: 'success',
          text1: 'Profile Created',
          text2: 'Your profile was created successfully👋'
        });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Profile crationg was not successfull, try again later.'
          });
        console.error("Error submitting profile:", error)
        } finally {
        setIsSubmitting(false);
        }
    };

  return (
    <VStack className="flex-1 justify-center" space="lg">
      <Image
        source={require('@/assets/images/student.png')}
        size="full"
        className="self-center aspect-[384/384] h-2/3"
        alt="Student profile setup"
      />
      <Heading className="text-white text-center" size="xl">
        You haven't set up your student profile yet
      </Heading>
      <Button 
        variant="outline" 
        className="w-full gap-x-2" 
        size="xl" 
        onPress={() => setShowDialog(true)}
      >
        <FontAwesome6 name="user" size={28} color="#D6BD98" />
        <ButtonText className="text-secondary-0">Let's do that</ButtonText>
      </Button>

      <ModalDialog
        isOpen={showDialog}
        onClose={currentStep === 'faculty' ? () => setShowDialog(false) : handleBack}
        onAction={currentStep === 'details' ? handleSubmit : handleNext}
        title="Create your student profile"
        actionText={currentStep === 'details' ? 'Submit' : 'Next'}
        cancelText={currentStep === 'faculty' ? 'Cancel' : 'Back'}
        isLoading={isSubmitting}
      >
        {steps ? (
          steps[currentStep].fields.map(field => (
            <FormFieldComponent
              key={field.id}
              {...field}
              value={formData[field.id]}
              onChange={handleChange(field.id)}
              isInvalid={!!errors[field.id]}
              errorText={errors[field.id]}
              isDisabled={field.id === 'department' && !formData.faculty}
              options={field.id === 'department' ? (
                departmentsData 
                  ? createOptionsFromResponse(departmentsData, "id", "name")
                  : []
              ) : field.options}
            />
          ))
        ) : (
          <Text>Loading form fields...</Text>
        )}
      </ModalDialog>
    </VStack>
  );
}
