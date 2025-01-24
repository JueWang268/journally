'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../dashboard/page.js'), { ssr: false })

export function ClientOnly() {
  return <App />
}