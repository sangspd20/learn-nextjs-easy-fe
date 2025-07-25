import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    req.headers.cookie = '';
    req.url = req.url?.replace(/^\/api/, '');

    proxy.web(req, res, {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once('proxyRes', () => {
      resolve();
    });

    proxy.once('error', (err) => {
      console.error('❌ Proxy error:', err);
      reject(err);
    });
  });
}
