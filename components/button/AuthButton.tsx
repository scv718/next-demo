'use client';

import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';

type AuthButtonProps = {
  session: Session | null;
};

export default function AuthButton({ session }: AuthButtonProps): React.ReactNode {
  const anonymous = (
    <div className='flex items-center space-x-2'>
      <Link
        href={'/signin'}
        className={'px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'}>
        Log In
      </Link>
      <Link
        href={'/signup'}
        className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'>
        Sign Up
      </Link>
    </div>
  );

  const user = (
    <div className='flex items-center space-x-2'>
      <Button
        onClick={() => signOut()}
        className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'>
        Log out
      </Button>
    </div>
  );

  if (session?.accessToken) {
    return user;
  }

  return anonymous;
}
