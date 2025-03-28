import { ReactNode } from 'react';

export interface Option {
    value: string;
    label: string;
}

export interface Metadata {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface ApiResponseWithHeader<T> {
    data?: T[];
    headers?: any;
}

export interface ErrorResponse {
    message: string;
    code?: string;
    details?: any;
}

export interface ServiceResponse<T> {
    data?: T;
    error?: ErrorResponse;
    success: boolean;
}

export interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void | Promise<void>;
    title?: string;
    actionText?: string;
    cancelText?: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    isLoading?: boolean;
    closeOnAction?: boolean;
    preventCloseOnAction?: boolean;
}
