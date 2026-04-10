import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { CursorFollower } from '@/components/cursor-follower'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Norbu Tshering | Full-Stack Product Engineer',
  description: 'Creative full-stack product engineer focused on the intersection of design and technology. Crafting modern, minimalist, and user-centered digital experiences.',
  generator: 'v0.app',
  keywords: ['Full-Stack Developer', 'Product Engineer', 'UI/UX Design', 'React', 'Next.js', 'Web Development', 'Bhutan'],
  authors: [{ name: 'Norbu Tshering' }],
  openGraph: {
    title: 'Norbu Tshering | Full-Stack Product Engineer',
    description: 'Creative full-stack product engineer focused on the intersection of design and technology.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JE655CN568"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JE655CN568');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <CursorFollower />
        <Analytics />
      </body>
    </html>
  )
}
