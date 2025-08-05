'use client';

import { useActionState } from 'react';
import { type ReactNode } from 'react';

import { type ActionState, credentials, kakao } from '@/app/signin/actions';
import AuthBox from '@/components/boxes/AuthBox';
import { SocialButton } from '@/components/button/SocialButton';
import { FormInput } from '@/components/inputs/FormInput';
import { StyledLink } from '@/components/links/StyledLink';
import { type LoginSchema, loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

interface LoginFormProps {
  action?: (formData: FormData) => Promise<void>;
  children?: ReactNode;
}

const socialButtons = [
  { src: '/assets/images/login/google.svg', onClick: kakao, alt: 'Google' },
  { src: '/assets/images/login/linkedin.svg', onClick: kakao, alt: 'Linkedin' },
  { src: '/assets/images/login/github.svg', onClick: kakao, alt: 'Github', isDarkModeInvert: true },
  { src: '/assets/images/login/facebook.svg', onClick: kakao, alt: 'Facebook' },
  { src: '/assets/images/login/twitter.svg', onClick: kakao, alt: 'Twitter' },
  { src: '/assets/images/login/apple.svg', onClick: kakao, alt: 'Apple' },
  { src: '/assets/images/login/kakao.svg', onClick: kakao, alt: 'Kakao' }
];

export function LoginForm({ action, children }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(credentials, { error: '' });

  const {
    register,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  return (
    <AuthBox title={'Log In'}>
      <form action={action ?? formAction} className='space-y-4'>
        <FormInput label='Email' type='email' placeholder='Email' required {...register('email')} />
        <FormInput label='Password' type='password' placeholder='Password' required {...register('password')} />
        {state?.error && <p className='error-text'>{state.error}</p>}

        <div className='text-sm'>
          <StyledLink href='#'>Forget your password?</StyledLink>
        </div>

        {/* 외부에서 넘겨준 버튼이나 메시지 */}
        {children}

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
      </form>
    </AuthBox>
  );
}
