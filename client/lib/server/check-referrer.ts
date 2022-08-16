import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createError } from '../../defines/errors';

const referrerWhitelsit = ['http://localhost:3000', 'https://kakao-vision.kay.kr'];

const cors = Cors({ methods: ['GET', 'POST'] });

export async function checkReferrer(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(createError('NO_PERMISSION'));
      }

      return resolve(result);
    });
  });

  // for (const referrer of referrerWhitelsit) {
  //   if (req.headers.referer?.includes(referrer)) {
  //     return;
  //   }
  // }

  // res.status(403);
  // throw createError('NO_PERMISSION');
}
