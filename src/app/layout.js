import "../styles/App.css"
import { AuthContextProvider } from './context/AuthContext.js';


export const metadata = {
  title: 'Journally',
  description: 'Data Powered Journalling Experience Defined by YOU'
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <div id="root">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  )
}