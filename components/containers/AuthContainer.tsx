import { type ComponentProps } from 'react';

import { StyledLink } from '@/components/links/StyledLink';

type AuthContainerProps = ComponentProps<'div'> & {
  title: string;
};

export default ({ title, children }: AuthContainerProps) => {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4'>
      <div className='border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2'>
        <h1 className='pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default'>{title}</h1>
        {children}
        <div className='text-gray-500 flex text-center flex-col mt-4 items-center text-sm'>
          <p className='cursor-default'>
            By signing in, you agree to our <StyledLink href='#'>Terms</StyledLink> and{' '}
            <StyledLink href='#'>Privacy Policy</StyledLink>
          </p>
        </div>
      </div>
    </div>
  );
};
