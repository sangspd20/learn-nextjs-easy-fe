import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res)
    const accessToken = cookies.get('access_token')
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`
    }
    req.headers.cookie = ''
    //req.url = req.url?.replace(/^\/api/, '');

    proxy.web(req, res, {
      //target: 'https://jsonplaceholder.typicode.com',
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes', () => {
      resolve()
    })

    proxy.once('error', (err) => {
      console.error('❌ Proxy error:', err)
      reject(err)
    })
  })
}
