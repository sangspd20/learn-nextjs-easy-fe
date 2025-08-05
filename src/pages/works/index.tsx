import { workApi } from '@/api-clients'
import { MainLayout } from '@/components/layout'
import React, { useEffect } from 'react'

export default function WorksPage() {
  useEffect(() => {
    ;(async () => {
      try {
        const workList = await workApi.getAll({ _page: 1 })
        console.log({ workList })
      } catch (error) {
        console.log('failed to fetch work list', error)
      }
    })()
  }, [])

  return <div>Works Page</div>
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
  console.log('get static props')
  // const workList = await workA

  return {
    props: {},
  }
}
