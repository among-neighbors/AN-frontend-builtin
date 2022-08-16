import { LocalImage } from 'types/image';

interface LoadImageOptions {
  maxSizeInBytes?: number;
}

export async function loadImage(file: File, options?: LoadImageOptions): Promise<LocalImage> {
  return new Promise((resolve, reject) => {
    if (options?.maxSizeInBytes && file.size > options.maxSizeInBytes * 1024 * 1024) {
      reject(
        `Exceeded maximum file size (${options.maxSizeInBytes}MB). current file size: ${
          file.size / 1024 / 1024
        }MB`,
      );
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const previewSrc = String(reader.result);
      const { width, height } = await new Promise((resolve2) => {
        const image = new Image();
        image.onload = () => {
          resolve2({ width: image.width, height: image.height });
        };
        image.src = previewSrc;
      });
      resolve({
        file,
        size: { width, height },
        previewSrc,
      } as LocalImage);
    };
    reader.readAsDataURL(file);
  });
}
