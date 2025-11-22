import './globals.css'
import { Metadata } from 'next';
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Weddingly - Klaudia i Darek',
  description: 'Strona ślubna Klaudii i Darka',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        {children}
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <Analytics />
      </body>
    </html>
  );
}
