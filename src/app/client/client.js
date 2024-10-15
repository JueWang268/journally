'use client'
 
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('../page.js'), { ssr: false })
 
export function ClientOnly() {
  return <App />
}