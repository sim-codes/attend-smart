import React from 'react';
import { View, Text } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View className="flex-row items-center justify-start w-[90%] h-[52px] border border-[#D92D20] bg-[#FEF3F2] p-3 rounded-lg">
      {text1 && (
        <Text className="text-[#D92D20] text-[12px] font-semibold">
          {text1}
        </Text>
      )}
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View className="flex-row items-center justify-start w-[90%] h-[52px] border border-[#ABEFC6] bg-[#ECFDF3] p-3 rounded-lg">
      {text1 && (
        <Text className="text-[#067647] text-[12px] font-semibold">
          {text1}
        </Text>
      )}
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
  delete: ({ text1, text2 }: CustomToastProps) => (
    <View className="flex-row items-center justify-start w-[90%] h-[52px] border border-[#D92D20] bg-[#FEF3F2] p-3 rounded-lg">
      {text1 && (
        <Text className="text-[#D92D20] text-[12px] font-semibold">
          {text1}
        </Text>
      )}
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;
