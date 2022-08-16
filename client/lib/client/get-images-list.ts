import { fetcher } from '../fetcher';

interface AWSObjectContent {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: 'STANDARD' | 'GLACIER';
}

export async function getImagesList() {
  return await fetcher<AWSObjectContent[]>('/api/images');
}
