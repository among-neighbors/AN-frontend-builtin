import type { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from 'utils/with-error-handler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.json({ cookie: req.cookies['kay.test'] ?? 'Empty' });
  }

  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'kay.test=hello-world; path=/; httpOnly; secure;');
    return res.status(201).json({ status: 'ok' });
  }
};

export default withErrorHandler(handler);