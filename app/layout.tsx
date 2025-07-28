import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '타이틀',
  description: '설명',
  keywords: '키워드1, 키워드2, 키워드3',
  openGraph: {
    title: '타이틀',
    description: '설명',
    url: 'https://실제 url', // 실제 URL로 변경
    images: [
      {
        url: 'https://이미지경로',
        width: 512,
        height: 512,
        alt: '[xxx]로고'
      }
    ],
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
