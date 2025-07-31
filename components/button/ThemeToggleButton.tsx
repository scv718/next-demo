'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Button } from 'flowbite-react';
import { HiMoon, HiSun } from 'react-icons/hi';

export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-10 h-10' />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={toggleTheme} color='gray' size='sm' className='p-2.5' aria-label='테마 전환'>
      {resolvedTheme === 'dark' ? <HiSun className='h-5 w-5' /> : <HiMoon className='h-5 w-5' />}
    </Button>
  );
}
