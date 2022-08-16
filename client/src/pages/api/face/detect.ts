import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import { HeadObjectCommand } from '@aws-sdk/client-s3';
import { withErrorHandler } from '../../../../utils/with-error-handler';
import { s3Client } from '../../../../utils/aws/s3';
import { isString } from '../../../../utils/validator/common';
import { createError } from '../../../../defines/errors';
//import { checkReferrer } from '@lib/server/check-referrer';
import { enableCors } from '../../../../lib/server/enable-cors';

const Bucket = process.env.AWS_BUCKET_NAME;
if (!Bucket) throw new Error('Missing AWS_BUCKET_NAME');
const CDN_URL = process.env.CDN_URL;
if (!CDN_URL) throw new Error('Missing CDN_URL');
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
if (!KAKAO_REST_API_KEY) throw new Error('Missing KAKAO_REST_API_KEY');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // await checkReferrer(req, res);
    await enableCors(req, res);

    const { key } = req.body;

    if (!isString(key, { minLength: 10 })) {
      return res.status(400).json(createError('VALIDATION_FAILED'));
    }

    const command = new HeadObjectCommand({ Bucket, Key: key });
    await s3Client.send(command).catch(() => {
      return res.status(404).json(createError('AWS_ERROR', { message: 'Object does not exist.' }));
    });

    const response = await fetch('https://dapi.kakao.com/v2/vision/face/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      body: qs.stringify({ image_url: `${CDN_URL}/${key}` }),
    });

    if (!response.ok) {
      return res.status(500).json(createError('KAKAO_ERROR', { message: await response.text() }));
    }

    const data = await response.json();

    return res.json(data);
  }
};

export default withErrorHandler(handler);