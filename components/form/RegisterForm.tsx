'use client';

import { useActionState } from 'react';

import { type ActionState, signUp } from '@/app/signup/actions';
import AuthContainer from '@/components/containers/AuthContainer';
import { FormInput } from '@/components/inputs/FormInput';
import { StyledLink } from '@/components/links/StyledLink';
import { type RegisterSchema, registerSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

export function RegisterForm() {
  // useActionState로 서버 액션과 폼의 상태를 연결해요.
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(signUp, { error: '' });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', username: '' }
  });

  return (
    <AuthContainer title={'Log In'}>
      <form action={formAction} className='space-y-4'>
        <FormInput label='Email' type='email' placeholder='Email' required {...register('email')} />
        <FormInput label='Username' type='text' placeholder='Username' required {...register('username')} />
        <FormInput label='Password' type='password' placeholder='Password' required {...register('password')} />
        {/* 서버로부터 받은 로그인 실패 에러 메시지 */}
        {state?.error && <p className='error-text'>{state.error}</p>}
        <button
          className='bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out'
          type='submit'>
          {isPending ? '회원가입 중...' : '회원 가입'}
        </button>
      </form>

      <div className='flex flex-col mt-4 items-center justify-center text-sm'>
        <h3 className='dark:text-gray-300'>
          이미 계정이 있니..? <StyledLink href='/signin'>로그인</StyledLink>
        </h3>
      </div>
    </AuthContainer>
  );
}
