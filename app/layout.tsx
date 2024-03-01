

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import favicon_16 from '@/public/favicon/favicon_16.png'
import favicon_32 from '@/public/favicon/favicon_32.png'
import apple_touch_icon from '@/public/favicon/apple_touch_icon.png'
import './ui/globals.css'
import { ReduxProvider } from '@/redux/provider'
import { Provider } from '@/theme/provider'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-[#13121A] bg-[#CCCCFA66]`}>
        <Provider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </Provider>
       
      </body>
    </html>
  )
}
