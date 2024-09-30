import "../styles/App.css"

export const metadata = {
  title: 'Journally',
  description: 'Data Powered Journalling Experience Defined by YOU'
}


export default function RootLayout({ children }) {
    return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}