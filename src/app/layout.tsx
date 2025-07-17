import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import ThemeToggle from '@/components/ThemeToggle'
import SmoothScrolling from '@/components/SmoothScrolling'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Edson's Portfolio",
  description: 'Modern portfolio website showcasing projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <SmoothScrolling />
          <Header />
          <ThemeToggle />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}