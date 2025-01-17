import { Inter, Lora } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  weight: ["400", "500", "700", "800", "900"],
  display: 'swap',
  fallback: ["Helvetica"],
  variable: '--inter-font'
})

const lora = Lora({
  subsets: ['latin'],
  weight: ["400", "500", "700"],
  display: 'swap',
  variable: '--lora-font'
})

export { inter, lora }