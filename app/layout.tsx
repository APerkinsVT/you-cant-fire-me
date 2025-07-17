import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouCantFireMe.co,
  description: 'Generate hilarious AI resignation letters instantly.'
  generator: 'YouCantFireMe',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
