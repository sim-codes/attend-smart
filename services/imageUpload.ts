import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { BASE_URL } from './api';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

interface ImageUploadResponse {
    imageUrl: string;
}

class ImageUploadService {
    private serverUrl: string;

    constructor() {
        this.serverUrl = `${BASE_URL}${API_ENDPOINTS.authentication.uploadImage}`;
    }

    async pickImage(): Promise<string | null> {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            allowsMultipleSelection: false,
        });

        if (result.canceled) return null;
        const selectedUri = result.assets[0].uri;

        // Only validate extensions on mobile platforms
        if (Platform.OS !== 'web') {
            const fileExtension = selectedUri.split('.').pop()?.toLowerCase();
            const validExtensions = ['jpg', 'jpeg', 'png'];
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Please select a JPG, JPEG, or PNG image file');
                return null;
            }
        }

        return selectedUri;
    }

    async uploadToServer(localUri: string): Promise<string | null> {
        const formData = new FormData();

        if (Platform.OS === 'web') {
            // For web, handle base64 data URI
            if (localUri.startsWith('data:')) {
                // Extract MIME type and convert base64 to blob
                const match = localUri.match(/^data:([^;]+);base64,(.+)$/);
                if (!match) {
                    alert('Invalid image format');
                    return null;
                }

                const [, mimeType, base64Data] = match;
                const fileType = mimeType.split('/')[1] || 'jpeg';
                const fileName = `image_${new Date().getTime()}.${fileType}`;

                // Convert base64 to blob
                const byteCharacters = atob(base64Data);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, { type: mimeType });

                // Append blob to form data
                formData.append('file', blob as any, fileName);
            } else {
                // If it's already a blob URL or other format on web
                const fetchResponse = await fetch(localUri);
                const blob = await fetchResponse.blob();
                const mimeType = blob.type;
                const fileType = mimeType.split('/')[1] || 'jpeg';
                const fileName = `image_${new Date().getTime()}.${fileType}`;

                formData.append('file', blob, fileName);
            }
        } else {
            // Standard mobile handling
            const fileExtension = localUri.split('.').pop()?.toLowerCase();
            const fileName = `image_${new Date().getTime()}.${fileExtension}`;

            formData.append('file', {
                uri: localUri,
                type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
                name: fileName
            } as any);
        }

        try {
            console.log('payload', formData)
            const response = await axios.post<ImageUploadResponse>(
                this.serverUrl,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            return response.data.imageUrl;
        } catch (error: any) {
            // Better error handling
            if (axios.isAxiosError(error) && error.response) {
                console.error('Server error:', error.response.data);
                alert(`Upload failed: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Image upload error:', error);
                alert('Failed to upload image. Please try again.');
            }
            return null;
        }
    }

    async handleImageUpload(): Promise<string | null> {
        const localUri = await this.pickImage();
        if (!localUri) return null;

        return this.uploadToServer(localUri);
    }
}

const imageUploadService = new ImageUploadService();

export default imageUploadService;
