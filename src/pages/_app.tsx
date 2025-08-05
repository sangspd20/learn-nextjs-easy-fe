import axiosClient from '@/api-clients/axios-client'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.css'
import 'prismjs/themes/prism-tomorrow.css' // or another Prism theme
import 'prismjs/plugins/line-numbers/prism-line-numbers.css' // Optional if using line numbers

import { SWRConfig } from 'swr'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache, heebo, theme } from '@/utils'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ToastContainer />

        <div className={heebo.className}>
          <SWRConfig
            value={{ fetcher: (url: string) => axiosClient.get(url), shouldRetryOnError: false }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}
