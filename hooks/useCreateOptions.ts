import { Option } from "@/constants/types/common";

export const createOptionsFromResponse = <T extends { id: string; name: string }>(
    items: T[],
    valueKey: keyof T = 'id',
    labelKey: keyof T = 'name'
): Option[] => {
    return items.map(item => ({
        value: String(item[valueKey]),
        label: String(item[labelKey])
    }));
};
