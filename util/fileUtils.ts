
import type { ImageData } from '../types';

export const fileToBase64 = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [mimePrefix, base64Data] = result.split(',');
      if (!base64Data) {
        reject(new Error("Invalid file format"));
        return;
      }
      const mimeType = mimePrefix.split(':')[1].split(';')[0];
      resolve({ mimeType, data: base64Data });
    };
    reader.onerror = (error) => reject(error);
  });
};
   