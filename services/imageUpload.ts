import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { BASE_URL } from './api';
import * as FileSystem from 'expo-file-system';

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
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            allowsMultipleSelection: false,
        });

        if (result.canceled) return null;
        const selectedUri = result.assets[0].uri;
        const fileExtension = selectedUri.split('.').pop()?.toLowerCase();
        // const validExtensions = ['jpg', 'jpeg', 'png'];
        // if (!fileExtension || !validExtensions.includes(fileExtension)) {
        //     alert('Please select a JPG, JPEG, or PNG image file');
        //     return null;
        // }
        return selectedUri;
    }

    async uploadToServer(localUri: string): Promise<string | null> {
        const fileExtension = localUri.split('.').pop()?.toLowerCase();

        const fileName = `image_${new Date().getTime()}.${fileExtension}`;

        const formData = new FormData();
        formData.append('file', {
            uri: localUri,
            type: fileExtension === 'png' ? 'image/png' : 'image/jpeg',
            name: fileName
        } as any);

        try {
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
