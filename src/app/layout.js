import "../App.css"

export const metadata = {
  title: 'Journally',
  description: 'Data Driven Journalling Experience Defined by YOU'
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