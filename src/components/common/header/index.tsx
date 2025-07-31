import HeaderDesktop from '@/components/common/header/header-desktop'
import HeaderMobile from '@/components/common/header/header-mobile'
import * as React from 'react'

export function Header() {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  )
}
