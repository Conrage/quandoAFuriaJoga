import Head from 'next/head'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quando a Furia joga?',
  description: 'Veja quando a super Furia entra em campo. Confira quando a furia joga ou já jogou! Juntamente com as super opiniões do nosso especialista.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
