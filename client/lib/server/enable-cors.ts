import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { runMiddleware } from '@utils/run-middleware';

const cors = Cors({});

export async function enableCors(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
}
