import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import { Providers } from '@/app/Providers';
import AuthButton from '@/components/button/AuthButton';
import { ThemeToggleButton } from '@/components/button/ThemeToggleButton';
import Navbar from '@/components/navbars/Navbar';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

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

// Navbar에 전달할 메뉴 데이터 예시
const sampleMenuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    // 서브메뉴 예시
    subMenu: [
      { label: 'Laptops', href: '/products/laptops' },
      { label: 'Monitors', href: '/products/monitors' },
      { label: 'Keyboards', href: '/products/keyboards' }
    ]
  },
  { label: 'About Us', href: '/about' },
  { label: '문의 게시판', href: '/posts' }
];

// 로고 컴포넌트 예시
const sampleLogo = (
  <Link href='/' className='text-xl font-bold'>
    MyLogo
  </Link>
);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SessionProvider>
            <Navbar
              logo={sampleLogo}
              menuItems={sampleMenuItems}
              buttons={<AuthButton />}
              position={'floating'}
              rounded='full' // 양쪽이 둥근 모서리
              subMenuTrigger='click' // 클릭으로 서브메뉴 열기
              bgColor='bg-white/70 backdrop-blur-sm' // 반투명 배경 + 블러 효과
              menuAlignment={'center'}
              mobileMenuStyle={{ rounded: 'sm', shadow: 'lg', menuContentAlignment: 'right' }}
            />
            <div className={'mt-30'}>{children}</div>
            {/* 전역 테마 토글 버튼 */}
            <div className='fixed bottom-8 right-8 z-50'>
              <ThemeToggleButton />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
