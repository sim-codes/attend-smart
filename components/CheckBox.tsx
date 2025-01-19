import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";

const CustomCheckbox = ({ isChecked }: { isChecked: boolean }) => (
    <VStack
    className={`w-6 h-6 rounded border-2 justify-center items-center ${
        isChecked ? 'bg-primary-700 border-primary-700' : 'border-gray-300'
    }`}
    >
    {isChecked && (
        <Ionicons name="checkmark" size={16} color="white" />
    )}
    </VStack>
);

export default CustomCheckbox;
