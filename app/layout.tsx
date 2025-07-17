import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouCantFireMe.co',
  description: 'Generate hilarious AI resignation letters instantly.',
  generator: 'YouCantFireMe',
  icons: '/favicon.ico', // Simple single favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
