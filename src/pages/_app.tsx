import axiosClient from '@/api-clients/axios-client'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.css'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => axiosClient.get(url), shouldRetryOnError: false }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
