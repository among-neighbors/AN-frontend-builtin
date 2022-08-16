import { S3Client } from '@aws-sdk/client-s3';

import credentials from 'utils/aws/credentials';

export const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials,
});
