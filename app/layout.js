import Navbar from '@/components/Navbar'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'SpeakEasy 2.0',
  description: 'Real-time voice to text note app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Navbar />
        {children}
        </body>
    </html>
  )
}
