'use client';

import { useActionState } from 'react';

import { SocialButton } from '@/components/button/SocialButton';
import { FormInput } from '@/components/inputs/FormInput';
import { StyledLink } from '@/components/links/StyledLink';
import { type ActionState, credentials, kakao } from '@/lib/actions';
import { type LoginSchema, loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const socialButtons = [
  { src: 'https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/', onClick: kakao, alt: 'Google' },
  { src: 'https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/', onClick: kakao, alt: 'Linkedin' },
  {
    src: 'https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/',
    onClick: kakao,
    alt: 'Github',
    isDarkModeInvert: true
  },
  { src: 'https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/', onClick: kakao, alt: 'Facebook' },
  { src: 'https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/', onClick: kakao, alt: 'Twitter' },
  { src: 'https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/', onClick: kakao, alt: 'Apple' }
];

export function LoginForm() {
  // useActionState로 서버 액션과 폼의 상태를 연결해요.
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(credentials, { error: '' });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4'>
      <div className='border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2'>
        <h1 className='pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default'>Log in</h1>
        <form action={formAction} method='POST' className='space-y-4'>
          <FormInput label='Email' type='email' placeholder='Email' required {...register('email')} />
          <FormInput label='Password' type='password' placeholder='Password' required {...register('password')} />
          {/* 서버로부터 받은 로그인 실패 에러 메시지 */}
          {state?.error && <p className='error-text'>{state.error}</p>}
          <div className='text-sm'>
            <StyledLink href='#'>Forget your password?</StyledLink>
          </div>
          <button
            className='bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out'
            type='submit'>
            {isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className='flex flex-col mt-4 items-center justify-center text-sm'>
          <h3 className='dark:text-gray-300'>
            Don&apos;t have an account? <StyledLink href='/singup'>회원가입</StyledLink>
          </h3>
        </div>

        {/* Third Party Authentication Options */}
        <div className='flex items-center justify-center mt-5 flex-wrap'>
          {socialButtons.map((btn) => (
            <SocialButton key={btn.alt} src={btn.src} alt={btn.alt} isDarkModeInvert={btn.isDarkModeInvert} />
          ))}
        </div>

        <div className='text-gray-500 flex text-center flex-col mt-4 items-center text-sm'>
          <p className='cursor-default'>
            By signing in, you agree to our <StyledLink href='#'>Terms</StyledLink> and{' '}
            <StyledLink href='#'>Privacy Policy</StyledLink>
          </p>
        </div>
      </div>
    </div>
  );
}
