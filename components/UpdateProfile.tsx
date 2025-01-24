import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "@/components/ModalDialog";
import { useSession } from "@/hooks/ctx";
import FormFieldComponent from "@/components/FormFieldComponent";
import { ChangePasswordFieldId, ProfileUpdateFormFields, FacultyAndDepartmentApiResponse, ProfileUpdateStep, ProfileUpdateFieldId } from "@/constants/types";
import { changePasswordFormFields, createProfileUpdateSteps } from "@/constants/forms";
import { authService } from "@/services/auth";
import Toast from "react-native-toast-message";
import { useApp } from "@/hooks/appContext";
import { createOptionsFromResponse } from "@/hooks/createOptions";
import { facultyService } from "@/services/faculty";
import { levelService } from "@/services/level";
import { departmentService } from "@/services/department";

export default function UpdateProfile() {
    const { user } = useSession();
    const { profile, updateProfile } = useApp();

       // Form state
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState<ProfileUpdateStep>('faculty');

    // Data state
    const [steps, setSteps] = useState<ProfileUpdateFormFields | undefined>(undefined);
    const [facultiesData, setFacultiesData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [departmentsData, setDepartmentsData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [levelsData, setLevelsData] = useState<any[] | null>(null);

    const [errors, setErrors] = useState<Partial<Record<ProfileUpdateFieldId, string>>>({});

    const [formData, setFormData] = useState<Record<ProfileUpdateFieldId, string>>({
        matriculationNumber: profile?.matriculationNumber!,
        level: "",
        department: "",
        faculty: "",
        firstname: profile?.firstName!,
        lastname: profile?.lastName!,
        email: profile?.email!,
        phonenumber: profile?.phoneNumber!,
        profileImageUrl: profile?.profileImageUrl!,
    });

    // validation rules
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
        firstname: (value: string) => {
            if (!value) return "First name is required";
            return "";
        },
        lastname: (value: string) => {
            if (!value) return "Last name is required";
            return "";
        },
        email: (value: string) => {
            if (!value) return "Email is required";
            return "";
        },
        phonenumber: (value: string) => {
            if (!value) return "Phone number is required";
            return "";
        },
        profileImageUrl: (value: string) => {
            if (!value) return "Profile image is required";
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
    }

        const updateFormSteps = () => {
            const facultyOptions = createOptionsFromResponse(facultiesData!, "id", "name");
            const levelOptions = createOptionsFromResponse(levelsData!, "id", "name");
            const departmentOptions = departmentsData
            ? createOptionsFromResponse(departmentsData, "id", "name")
            : [];

            const steps = createProfileUpdateSteps(facultyOptions, departmentOptions, levelOptions);
            setSteps(steps!);
        };

        const handleChange = (id: ProfileUpdateFieldId) => (value: string) => {
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
                const newErrors: Partial<Record<ProfileUpdateFieldId, string>> = {};
        
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
                        setCurrentStep('personalInfo');
                    } else if (currentStep === 'personalInfo') {
                        setCurrentStep('additionalDetails');
                    }
                }
            };

            const handleBack = () => {
                if (currentStep === 'personalInfo') {
                setCurrentStep('faculty');
                } else if (currentStep === 'additionalDetails') {
                setCurrentStep('faculty');
                }
            };


    const handleSubmit = async () => {

    };

    return (
        <Pressable onPress={() => setShowDialog(true)}>
            <HStack space="sm" className="items-end">
                <Ionicons name="person-outline" size={28} color="#677D6A" />
                <Text size="xl" className="text-white">Update Profile</Text>
            </HStack>

            <ModalDialog
                isOpen={showDialog}
                onClose={currentStep === 'faculty' ? () => setShowDialog(false) : handleBack}
                onAction={currentStep === 'additionalDetails' ? handleSubmit : handleNext}
                title="Create your student profile"
                actionText={currentStep === 'additionalDetails' ? 'Submit' : 'Next'}
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
        </Pressable>
    )
}
