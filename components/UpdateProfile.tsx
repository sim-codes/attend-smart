import { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import FormFieldComponent from "@/components/forms/FormFieldComponent";
import { FacultyAndDepartmentApiResponse } from "@/constants/types/api";
import { ProfileUpdateFieldId, ProfileUpdateStep, ProfileUpdateFormFields } from "@/constants/types/profile";
import { createProfileUpdateSteps } from "@/constants/forms";
import Toast from "react-native-toast-message";
import { createOptionsFromResponse } from "@/hooks/useCreateOptions";
import { facultyService } from "@/services/faculty";
import { levelService } from "@/services/level";
import { departmentService } from "@/services/department";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { studentService } from "@/services/student";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEnrolledCourses } from "@/store/slices/courseSlice";

export default function UpdateProfile({ profileImageUrl } : { profileImageUrl?: string }) {
    const router = useRouter();
    const { data: profile } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    // Form state
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
        matriculationNumber: (value: string) => {
            if (!value) return "Matriculation number is required";
            return "";
        }
    };

    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, []);

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
                if (!validateStep()) return;

                if (currentStep === 'faculty') {
                    setCurrentStep('personalInfo');
                }
            };

            const handleBack = () => {
                if (currentStep === 'personalInfo') {
                setCurrentStep('faculty');
                }
            };


    const handleSubmit = async () => {

        if (profileImageUrl == undefined) {
            Toast.show({
                type: 'error',
                text1: 'Profile Image Required',
                text2: 'Profile image is a required field!',
            });
            return;
        }

        setIsSubmitting(true);

        const payload = {
            matriculationNumber: formData.matriculationNumber,
            levelId: formData.level,
            departmentId: formData.department,
            firstName: formData.firstname,
            lastName: formData.lastname,
            email: formData.email,
            phoneNumber: formData.phonenumber,
            profileImageUrl: profileImageUrl
        }

        const response = await studentService.updateStudentProfile(profile?.userId!, payload);

        if (response.success) {
            Toast.show({
                type: 'success',
                text1: 'Profile Update',
                text2: 'Your profile details has been updated successully',
            });

            dispatch(fetchEnrolledCourses(profile?.userId!));
            router.push('/')
        } else  {
            Toast.show({
                type: 'error',
                text1: 'Failed Request',
                text2: 'Your profile detials was not updated'
            });
            console.error('Profile update failed!');
        }

        setIsSubmitting(false)
    };

    return (
        <VStack className="flex-1" space="sm">

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
                <Text size="xl" bold>Loading form fields...</Text>
            )}

            <VStack space="xl">
                {currentStep !== 'faculty' && (
                        <Button className="w-full border-primary-500 rounded-full self-center mt-4" size="xl"
                            onPress={handleBack}
                            variant="outline">
                            <ButtonText size="xl">Back</ButtonText>
                        </Button>
                    )}

                <Button className="w-full rounded-full self-center" size="xl"
                    onPress={currentStep === 'personalInfo' ? handleSubmit : handleNext}
                    isDisabled={isSubmitting}
                    variant="solid">
                    <ButtonText size="xl">
                        {currentStep === 'personalInfo' ? 'Submit' : 'Next'}
                    </ButtonText>
                </Button>
            </VStack>
        </VStack>
    )
}
