'use client';

import { useActionState } from 'react';

import { type ActionState, signUp } from '@/app/signup/actions';
import AuthBox from '@/components/boxes/AuthBox';
import { FormInput } from '@/components/inputs/FormInput';
import { StyledLink } from '@/components/links/StyledLink';
import { type RegisterSchema, registerSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

export function RegisterForm() {
  // useActionState로 서버 액션과 폼의 상태를 연결해요.
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(signUp, { error: '' });

  const { register } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', username: '', phoneNumber: '' }
  });

  return (
    <AuthBox title={'Sign Up'}>
      <form action={formAction} className='space-y-4'>
        <FormInput label='Email' type='email' placeholder='Email' required {...register('email')} />
        {state?.details?.email && <p className='text-red-500 error-text'>{state?.details?.email[0]}</p>}
        <FormInput label='Username' type='text' placeholder='Username' required {...register('username')} />
        {state?.details?.username && <p className='text-red-500 error-text'>{state?.details?.username[0]}</p>}
        <FormInput label='Password' type='password' placeholder='Password' required {...register('password')} />
        {state?.details?.password && <p className='text-red-500 error-text'>{state?.details?.password[0]}</p>}
        <FormInput label='핸드폰 번호' type='text' placeholder='핸드폰 번호' required {...register('phoneNumber')} />
        {state?.details?.phoneNumber && <p className='text-red-500 error-text'>{state?.details?.phoneNumber[0]}</p>}
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
    </AuthBox>
  );
}
