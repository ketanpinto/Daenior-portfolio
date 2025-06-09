import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daeniors Portfolio',
  description: 'Made by Ketan',
  generator: 'k10.dev',
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
