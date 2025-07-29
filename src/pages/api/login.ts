import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
type Data = {
  message: string;
};
export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Method not supported' });
  }

  return new Promise<void>((resolve, reject) => {
    req.headers.cookie = '';
    console.log('Proxying to:', process.env.API_URL);

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });
          (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'something went wrong' });
        }

        resolve();
      });
    };
    proxy.once('proxyRes', handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    proxy.once('error', (err) => {
      console.error('❌ Proxy error:', err);
      reject(err);
    });
  });
}
