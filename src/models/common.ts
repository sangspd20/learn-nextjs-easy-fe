//import { EmotionCache } from '@emotion/cache'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (page: LayoutProps) => ReactElement
}

// Extend AppProps to include the layout
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  //emotionCache?: EmotionCache
}
