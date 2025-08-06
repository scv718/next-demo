'use server';

import { signIn } from '@/lib/auth';
import { loginSchema } from '@/lib/schema';

import { AuthError } from 'next-auth';

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function credentials(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: '이메일과 비밀번호를 올바르게 입력해주세요.' };
  }
  try {
    await signIn('credentials', {
      redirectTo: '/',
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
        default:
          return { error: '알 수 없는 오류가 발생했습니다.' };
      }
    }
    throw error;
  }

  return { error: '' };
}

export async function kakao() {
  await signIn('kakao', { redirectTo: '/' });
}

export async function naver() {
  await signIn('naver', { redirectTo: '/' });
}

export async function google() {
  await signIn('google', { redirectTo: '/' });
}
