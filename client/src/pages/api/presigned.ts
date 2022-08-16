import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { withErrorHandler } from 'utils/with-error-handler';
import { s3Client } from 'utils/aws/s3';
import { checkReferrer } from 'lib/server/check-referrer';
import { enableCors } from 'lib/server/enable-cors';

const Bucket = process.env.AWS_BUCKET_NAME;
if (!Bucket) throw new Error('Missing AWS_BUCKET_NAME');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // await checkReferrer(req, res);
    await enableCors(req, res);

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket,
      Key: `vision/${uuidv4()}`,
      Conditions: [
        { acl: 'public-read' },
        { Bucket },
        ['starts-with', '$key', 'vision/'],
        ['content-length-range', 1, 20 * 1024 * 1024],
      ],
      Fields: { acl: 'public-read' },
      Expires: 300,
    });

    return res.status(201).json({ url, fields });
  }
};

export default withErrorHandler(handler);