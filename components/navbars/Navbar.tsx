'use client';

import React, { Fragment, ReactNode, useState } from 'react';

import Link from 'next/link';

import MobileMenu from '@/components/navbars/MobileMenu';

// --- 타입 정의 (변경 없음) ---
interface MenuItem {
  label: string;
  href: string;
  subMenu?: MenuItem[];
}

interface MobileMenuStyle {
  bgColor?: string;
  textColor?: string;
  position?: 'static' | 'fixed' | 'floating';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  menuContentAlignment?: 'left' | 'right'; // 정렬 prop 받기
}

// [수정] NavbarProps 인터페이스: isFloating을 제거하고 position 옵션을 확장
interface NavbarProps {
  logo: ReactNode;
  menuItems: MenuItem[];
  buttons?: ReactNode;
  bgColor?: string;
  textColor?: string;
  menuAlignment?: 'left' | 'center' | 'right';
  // 'static': 기본 위치 (스크롤 따라 이동)
  // 'fixed': 화면 상단에 고정
  // 'floating': 화면 상단에 떠 있는 카드 형태로 고정
  position?: 'static' | 'fixed' | 'floating';
  subMenuTrigger?: 'hover' | 'click';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  mobileMenuStyle?: MobileMenuStyle;
}

const cornerRadiusMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

const Navbar: React.FC<NavbarProps> = ({
  logo,
  menuItems,
  buttons,
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
  menuAlignment = 'center',
  position = 'static', // 기본값은 static
  subMenuTrigger = 'hover',
  rounded = 'none',
  mobileMenuStyle
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  // [수정] 'position' prop에 따라 클래스를 생성하는 로직 단순화
  const navClasses: string[] = [textColor, bgColor];

  if (rounded) {
    navClasses.push(cornerRadiusMap[rounded]);
  }

  switch (position) {
    case 'floating':
      navClasses.push('fixed', 'z-50', 'top-4', 'left-1/2', '-translate-x-1/2', 'w-[90%]', 'max-w-6xl', 'shadow-lg');
      break;

    case 'fixed':
      navClasses.push('fixed', 'z-50', 'top-0', 'left-0', 'right-0', 'w-full');
      break;

    case 'static':
    default:
      navClasses.push('relative', 'w-full');
      break;
  }

  const navContainerClasses = navClasses.join(' ');
  const menuAlignmentClasses = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[menuAlignment];

  return (
    <Fragment>
      {/* 1. 네비게이션 바 */}
      <nav className={navContainerClasses}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* 로고, 메뉴, 버튼 등 내부 로직은 이전과 동일 */}
            <div className='flex-shrink-0'>{logo}</div>
            <div className={`hidden md:flex flex-grow ${menuAlignmentClasses}`}>
              <ul className='flex items-center space-x-4'>
                {menuItems.map((item, index) => (
                  <li key={index} className='relative group'>
                    {!item.subMenu ? (
                      <Link
                        href={item.href}
                        className='px-3 py-2 text-sm font-medium hover:text-blue-500 transition-colors'>
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => subMenuTrigger === 'click' && handleSubMenuToggle(index)}
                          className='flex items-center px-3 py-2 text-sm font-medium hover:text-blue-500 transition-colors'>
                          <span>{item.label}</span>
                          <svg
                            className={`w-4 h-4 ml-1 transition-transform ${openSubMenu === index ? 'rotate-180' : ''}`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'></path>
                          </svg>
                        </button>
                        <div
                          className={[
                            'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20',
                            subMenuTrigger === 'hover' ? 'hidden group-hover:block' : '',
                            subMenuTrigger === 'click' && openSubMenu === index ? 'block' : 'hidden'
                          ].join(' ')}>
                          <ul className='divide-y divide-gray-100'>
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/*fixed button*/}
            <div className='flex items-center'>
              <div className='hidden md:block'>{buttons && <div>{buttons}</div>}</div>
              <div className='md:hidden'>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className='inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none'
                  aria-controls='mobile-menu'
                  aria-expanded={isMobileMenuOpen}>
                  <span className='sr-only'>Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg
                      className='block h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  ) : (
                    <svg
                      className='block h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. 모바일 메뉴 패널 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        menuItems={menuItems}
        buttons={buttons}
        bgColor={mobileMenuStyle?.bgColor ? mobileMenuStyle?.bgColor : bgColor}
        textColor={mobileMenuStyle?.textColor ? mobileMenuStyle?.textColor : textColor}
        position={mobileMenuStyle?.position ? mobileMenuStyle?.position : position}
        rounded={mobileMenuStyle?.rounded ? mobileMenuStyle?.rounded : rounded}
        shadow={mobileMenuStyle?.shadow}
        menuContentAlignment={mobileMenuStyle?.menuContentAlignment}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </Fragment>
  );
};

export default Navbar;
