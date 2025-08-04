'use client';

import React, { ReactNode, useState } from 'react';

import Link from 'next/link';

interface MenuItem {
  label: string;
  href: string;
  subMenu?: MenuItem[];
}

// MobileMenu 컴포넌트가 받을 props 타입 정의
interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  buttons?: ReactNode;
  bgColor: string;
  textColor: string;
  position: 'static' | 'fixed' | 'floating';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  menuContentAlignment?: 'left' | 'right'; // 정렬 prop 받기
  onClose: () => void; // 메뉴 아이템 클릭 시 패널을 닫기 위한 함수
}

// 라운드 옵션을 Tailwind 클래스로 변환하는 맵
const cornerRadiusMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};
const shadowMap = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl'
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  menuItems,
  buttons,
  bgColor,
  textColor,
  position,
  rounded,
  shadow,
  menuContentAlignment = 'left',
  onClose
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  // position 상태에 따라 모바일 메뉴의 위치와 모양을 결정
  const mobileMenuClasses = [
    'md:hidden', // 데스크탑에선 항상 숨김
    bgColor,
    textColor,
    isOpen ? 'block' : 'hidden'
  ];

  if (rounded) {
    mobileMenuClasses.push(cornerRadiusMap[rounded]);
  }
  if (shadow) {
    mobileMenuClasses.push(shadowMap[shadow]);
  }

  if (position === 'floating') {
    mobileMenuClasses.push('fixed', 'z-40', 'top-24', 'w-[90%]', 'max-w-6xl', 'left-1/2', '-translate-x-1/2');
  } else if (position === 'fixed') {
    mobileMenuClasses.push('fixed', 'z-40', 'top-16', 'left-0', 'right-0', 'w-full');
  } else {
    mobileMenuClasses.push('absolute', 'z-40', 'w-full');
  }

  const ulClasses = ['px-2 pt-2 pb-3 space-y-1 sm:px-3'].join(' ');

  return (
    <div className={mobileMenuClasses.join(' ')} id='mobile-menu'>
      <ul className={ulClasses}>
        {menuItems.map((item, index) => (
          <li key={index}>
            {!item.subMenu ? (
              <Link
                href={item.href}
                className='w-full inline-block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white'
                onClick={onClose}>
                {item.label}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => handleSubMenuToggle(index)}
                  className='w-full text-left flex px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white'>
                  <span className={`flex-grow`}>{item.label}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${openSubMenu === index ? 'rotate-180' : ''}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                  </svg>
                </button>
                {openSubMenu === index && (
                  <ul className={`pl-4 mt-1 space-y-1`}>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className='w-full inline-block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-600 hover:text-white'
                          onClick={onClose}>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
        {buttons && (
          <li className='w-full pt-4 pb-2 border-t border-gray-700/50 mt-2'>
            <div
              className={`flex flex-col space-y-2 ${menuContentAlignment === 'right' ? 'items-end' : 'items-start'}`}>
              {buttons}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
