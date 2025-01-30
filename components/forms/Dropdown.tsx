import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Option } from '@/constants/types/common';
import { DropdownProps } from '@/constants/types/forms';


const Dropdown = ({
    options,
    value,
    placeholder = 'Select an option',
    onChange,
    error,
    disabled = false
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <VStack className="w-full">
            <TouchableOpacity
                onPress={() => !disabled && setIsOpen(true)}
                className={`
                h-16 p-4 border-primary-800 border rounded-lg bg-transparent justify-center
                ${disabled ? 'bg-tertiary-100' : 'active:bg-gray-50'}
                ${error ? 'border-red-700' : 'border-gray-300'}
                `}
            >
                <Text size='xl' className={`
                ${!selectedOption ? 'text-primary-900' : 'text-gray-900'}
                ${disabled ? 'text-primary-700' : ''}
                `}>
                {selectedOption?.label || placeholder}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                className="flex-1 bg-black/50"
                activeOpacity={1}
                onPress={() => setIsOpen(false)}
                >
                <View className="mt-auto bg-white rounded-t-xl shadow-lg">
                    <ScrollView className="max-h-96">
                    {options.map((option) => (
                        <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                        className={`
                            p-4 border-b border-gray-100
                            ${option.value === value ? 'bg-gray-50' : 'active:bg-gray-50'}
                        `}
                        >
                        <Text className={`
                            ${option.value === value ? 'font-semibold' : ''}
                        `}>
                            {option.label}
                        </Text>
                        </TouchableOpacity>
                    ))}
                    </ScrollView>
                </View>
                </TouchableOpacity>
            </Modal>
        </VStack>
    );
};

export default Dropdown;
