import { LoginFormField, SignupFormFields, ProfileCreationFormFields } from "@/constants/types";


export const signupSteps: SignupFormFields = {
    personal: {
        title: 'Personal Information',
        fields: [
            {
                id: 'firstname',
                label: "First Name",
                placeholder: "Enter first name",
                type: "text",
                helperText: "First name cannot be empty or contain numbers and special characters",
                isRequired: true
            },
            {
                id: 'lastname',
                label: "Last Name",
                placeholder: "Enter last name",
                type: "text",
                helperText: "Last name cannot be empty or contain numbers and special characters",
                isRequired: true
            },
            {
                id: 'username',
                label: "Username",
                placeholder: "Choose a username",
                type: "text",
                isRequired: true
            }
        ]
    },
    account: {
        title: 'Account Details',
        fields: [
            {
                id: 'email',
                label: "Email",
                placeholder: "Enter your email",
                type: "text",
                helperText: "Enter a valid email address",
                isRequired: true
            },
            {
                id: 'password',
                label: "Password",
                placeholder: "Enter your password",
                type: "password",
                helperText: "Must be at least 6 characters",
                isRequired: true
            },
            {
                id: 'confirmPassword',
                label: "Confirm Password",
                placeholder: "Confirm your password",
                type: "password",
                isRequired: true
            }
        ]
    },
    contact: {
        title: 'Contact Information',
        fields: [
            {
                id: 'phonenumber',
                label: "Phone Number",
                placeholder: "Enter your phone number",
                type: "text",
                isRequired: true
            }
        ]
    }
};

export const loginFormFields: LoginFormField[] = [
    {
        id: 'username',
        label: "Username",
        placeholder: "Enter your username",
        type: "text",
        helperText: "Enter a valid username",
        isRequired: true
    },
    {
        id: 'password',
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
        isRequired: true
    }
];

export const profileSteps: ProfileCreationFormFields = {
    faculty: {
        title: "",
        fields: [
            {
                id: "faculty",
                label: "Level",
                placeholder: "Select your faculty",
                type: "select",
                options: [
                    { value: "fos", label: "Faculty of Science" },
                    { value: "foa", label: "Faculty of Arts" },
                    { value: "foe", label: "Faculty of Engineering" }
                ],
                isRequired: true
            }
        ]
    },
    details: {
        title: "",
        fields: [
            {
                id: "matriculationNumber",
                label: "Matriculation Number",
                placeholder: "Enter your matriculation number",
                type: "text",
                isRequired: true
            },
            {
                id: "level",
                label: "Level",
                placeholder: "Select your level",
                type: "select",
                options: [
                    { value: "100", label: "100 Level" },
                    { value: "200", label: "200 Level" },
                    { value: "300", label: "300 Level" },
                    { value: "400", label: "400 Level" },
                    { value: "500", label: "500 Level" }
                ],
                isRequired: true
            },
            {
                id: "department",
                label: "Department",
                placeholder: "Select your department",
                type: "select",
                options: [
                    { value: "computer_science", label: "Computer Science" },
                    { value: "electrical_engineering", label: "Electrical Engineering" },
                    { value: "mechanical_engineering", label: "Mechanical Engineering" },
                    { value: "civil_engineering", label: "Civil Engineering" },
                    { value: "chemical_engineering", label: "Chemical Engineering" }
                ],
                isRequired: true
            }
        ]
    }
}
