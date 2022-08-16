import type { NextApiRequest, NextApiResponse } from 'next';
import isDecimal from 'validator/lib/isDecimal';
import { withErrorHandler } from '../../../utils/with-error-handler';
//import { checkReferrer } from '@lib/server/check-referrer';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client } from '../../../utils/aws/s3';
import { isString } from '../../../utils/validator/common';
import { createError } from '../../../defines/errors';
import { enableCors } from '../../../lib/server/enable-cors';

const Bucket = process.env.AWS_BUCKET_NAME;
if (!Bucket) throw new Error('Missing AWS_BUCKET_NAME');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // await checkReferrer(req, res);
    await enableCors(req, res);

    const { maxKeys = '100' } = req.query;

    if (!isString(maxKeys) || !isDecimal(maxKeys) || Number(maxKeys) <= 0) {
      return res
        .status(400)
        .json(createError('VALIDATION_FAILED', { message: 'invalid query parameter `maxKeys`' }));
    }

    const command = new ListObjectsV2Command({
      Bucket,
      Prefix: 'vision/',
      MaxKeys: Number(maxKeys),
    });
    const response = await s3Client.send(command);

    return res.json({ contents: response.Contents });
  }
};

export default withErrorHandler(handler);