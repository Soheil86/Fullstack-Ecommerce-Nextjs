'use client'

import { useThemeStore } from '@/store'
import { ReactNode, useEffect, useState } from 'react'

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return isHydrated ? (
    <body data-theme={themeStore.mode} className='px-4 lg:px-18 font-roboto'>
      {children}
    </body>
  ) : (
    <body></body>
  )
}
