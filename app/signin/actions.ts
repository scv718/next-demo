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
    // signIn 함수는 성공 시 내부적으로 redirect를 호출하거나,
    // 에러 발생 시 AuthError를 throw 할 수 있습니다.
    await signIn('credentials', {
      redirect: false, // redirect는 성공 후 수동으로 처리하기 위해 false로 설정
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
        default:
          return { error: '알 수 없는 오류가 발생했습니다.' };
      }
    }
    throw error; // 혹은 return { error: '...' }
  }
}

export async function kakao() {
  await signIn('kakao', { redirectTo: '/' });
}
