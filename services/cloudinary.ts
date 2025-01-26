import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

class CloudinaryService {
  private cloudinaryUrl: string;
  private uploadPreset: string;

  constructor(cloudName: string, uploadPreset: string) {
    this.cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    this.uploadPreset = uploadPreset;
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
    });

    return result.canceled ? null : result.assets[0].uri;
  }

  async uploadToCloudinary(localUri: string): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', {
      uri: localUri,
      type: 'image/jpeg',
      name: 'upload.jpg'
    } as any);
    formData.append('upload_preset', this.uploadPreset);

    try {
      const response = await axios.post<CloudinaryUploadResponse>(
        this.cloudinaryUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  }

  async handleImageUpload(): Promise<string | null> {
    const localUri = await this.pickImage();
    if (!localUri) return null;

    return this.uploadToCloudinary(localUri);
  }
}

const cloudinaryService = new CloudinaryService(
    process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
);

export default cloudinaryService;
