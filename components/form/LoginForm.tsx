'use client';

import { useActionState } from 'react';

import { type ActionState, credentials, kakao } from '@/app/signin/actions';
import { SocialButton } from '@/components/button/SocialButton';
import AuthContainer from '@/components/containers/AuthContainer';
import { FormInput } from '@/components/inputs/FormInput';
import { StyledLink } from '@/components/links/StyledLink';
import { type LoginSchema, loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const socialButtons = [
  { src: '/assets/images/login/google.svg', onClick: kakao, alt: 'Google' },
  { src: '/assets/images/login/Linkedin.svg', onClick: kakao, alt: 'Linkedin' },
  { src: '/assets/images/login/github.svg', onClick: kakao, alt: 'Github', isDarkModeInvert: true },
  { src: '/assets/images/login/facebook.svg', onClick: kakao, alt: 'Facebook' },
  { src: '/assets/images/login/twitter.svg', onClick: kakao, alt: 'Twitter' },
  { src: '/assets/images/login/apple.svg', onClick: kakao, alt: 'Apple' }
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
    <AuthContainer title={'Log In'}>
      <form action={formAction} className='space-y-4'>
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
          Don&apos;t have an account? <StyledLink href='/signup'>회원가입</StyledLink>
        </h3>
      </div>

      {/* Third Party Authentication Options */}
      <div className='flex items-center justify-center mt-5 flex-wrap'>
        {socialButtons.map((btn) => (
          <SocialButton
            key={btn.alt}
            src={btn.src}
            alt={btn.alt}
            onClick={btn.onClick}
            isDarkModeInvert={btn.isDarkModeInvert}
          />
        ))}
      </div>
    </AuthContainer>
  );
}
