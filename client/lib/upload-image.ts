import { createError } from '../defines/errors';
import { fetcher } from './fetcher';

export async function uploadImage(file: File) {
  const { url, fields } = await fetcher('/api/presigned');

  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const response = await fetch(url, { method: 'POST', body: formData });

  if (!response.ok) {
    const resBody = await response.text();

    throw createError('AWS_ERROR', {
      name: 'AWS Presigned upload failed',
      message: resBody,
    });
  }

  return fields.key as string;
}
