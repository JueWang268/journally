'use client'
 
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('../page'), { ssr: false })
 
export function ClientOnly() {
  return <App />
}