import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const aclonica = localFont({
  src: '../public/fonts/Aclonica-Regular.ttf',
  variable: '--font-aclonica',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PM Skills - 精选产品经理 AI Skills',
  description: '产品经理亲测与推荐的 AI Skills，快速落地产品 AI 工作流。',
  generator: 'v0.app',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23008f5d'/><text x='16' y='22' font-size='16' font-weight='800' fill='white' text-anchor='middle' font-family='sans-serif'>PM</text></svg>",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZYN64P9DW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZYN64P9DW');
          `}
        </Script>
      </head>
      <body className={`${aclonica.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
