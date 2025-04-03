type CompareFacesResponse = {
    success: boolean;
    data?: unknown;
    error?: { message: string };
};

  export const faceComparisonService = {
    compareFaces: async (image1Uri: string, image2Uri: string): Promise<CompareFacesResponse> => {
      try {
        const formData = new FormData();
  
        formData.append('image1', {
          uri: image1Uri,
          name: 'image1.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
  
        formData.append('image2', {
          uri: image2Uri,
          name: 'image2.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
  
        const response = await fetch('http://your-api-url/compare-faces/', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.detail || 'Failed to compare faces');
        }
  
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: { message: (error as Error).message || 'Failed to compare faces' } };
      }
    },
  };
