import { Platform } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';

interface FaceVerificationPayload {
    image1: Blob | string;
    image2: string;
}

type StandardImageBlob = Blob;

export class FaceVerificationService {
    async verifyFace(payload: FaceVerificationPayload): Promise<any> {
        const formData = new FormData();

        if (Platform.OS === 'web') {
            const image1 = await this.convertToStandardFormat(payload.image1);
            const image2 = await this.convertToStandardFormat(payload.image2);

            const image1MimeType = image1.type;
            const image1FileType = image1MimeType.split('/')[1] || 'jpeg';
            const image1FileName = `image_${new Date().getTime()}.${image1FileType}`;

            const image2MimeType = image2.type;
            const image2FileType = image2MimeType.split('/')[1] || 'jpeg';
            const image2FileName = `image_${new Date().getTime()}.${image2FileType}`;

            formData.append('image1', image1, image1FileName);
            formData.append('image2', image2, image2FileName);
        } else {
            const image1Extension = typeof payload.image1 === 'string'
                ? payload.image1.split('.').pop()?.toLowerCase() || 'jpg'
                : 'jpg';

            const image2Extension = payload.image2.split('.').pop()?.toLowerCase() || 'jpg';

            const image1Name = `image1.${image1Extension}`;
            const image2Name = `image2.${image2Extension}`;

            formData.append('image1', {
                uri: typeof payload.image1 === 'string' ? payload.image1 : URL.createObjectURL(payload.image1),
                name: image1Name,
                type: image1Extension === 'png' ? 'image/png' : 'image/jpeg',
            } as any);

            formData.append('image2', {
                uri: payload.image2,
                name: image2Name,
                type: image2Extension === 'png' ? 'image/png' : 'image/jpeg',
            } as any);
        }

        const response = await this.executeRequest(formData);
        return response;
    }

    private async convertToStandardFormat(imageSource: string | Blob): Promise<StandardImageBlob> {
        if (imageSource instanceof Blob) {
            return this.convertBlobToStandardFormat(imageSource);
        } else if (typeof imageSource === 'string' && imageSource.startsWith('data:')) {
            const match = imageSource.match(/^data:([^;]+);base64,(.+)$/);
            if (!match) {
                throw new Error('Invalid image format');
            }

            const [, mimeType, base64Data] = match;
            const byteCharacters = atob(base64Data);
            const byteArrays: Uint8Array[] = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);

                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                byteArrays.push(new Uint8Array(byteNumbers));
            }

            const tempBlob = new Blob(byteArrays, { type: mimeType });
            return this.convertBlobToStandardFormat(tempBlob);
        } else if (typeof imageSource === 'string') {
            const response = await fetch(imageSource);
            const blob = await response.blob();
            return this.convertBlobToStandardFormat(blob);
        }

        throw new Error('Unsupported image source type');
    }

    private convertBlobToStandardFormat(blob: Blob): Promise<StandardImageBlob> {
        const img = new Image();
        const blobUrl = URL.createObjectURL(blob);

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    URL.revokeObjectURL(blobUrl);
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((newBlob) => {
                    URL.revokeObjectURL(blobUrl);
                    if (newBlob) {
                        resolve(newBlob);
                    } else {
                        reject(new Error('Failed to convert image to blob'));
                    }
                }, 'image/jpeg', 0.9);
            };

            img.onerror = () => {
                URL.revokeObjectURL(blobUrl);
                reject(new Error('Failed to load image'));
            };

            img.src = blobUrl;
        });
    }

    private async executeRequest(formData: FormData): Promise<any> {
        try {
            const response = await axios.post('https://dcv7qtf3-8000.uks1.devtunnels.ms/compare-faces', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Face verification error:', error);
            throw error;
        }
    }
}

export default new FaceVerificationService();
