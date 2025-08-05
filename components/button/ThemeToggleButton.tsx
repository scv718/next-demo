'use client';

import { useEffect, useState } from 'react';
import * as React from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import { Moon, Sun } from 'lucide-react';

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
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      {resolvedTheme === 'light' ? (
        <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      ) : (
        <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
