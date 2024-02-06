import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import { ReduxProvider } from '@/redux/provider'
import { store } from '@/redux/store'
import { fetchSearchCoins } from '@/redux/features/searchCoin-slice'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Nex',
  description: 'Powered by crypto nex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#CCCCFA66]`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
