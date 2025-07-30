'use server';

import { signIn } from '@/lib/auth';
import { loginSchema } from '@/lib/schema';

export interface ActionState {
  error?: string;
}

export async function credentials(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: '이메일과 비밀번호를 올바르게 입력해주세요.' };
  }

  return await signIn('credentials', {
    redirectTo: '/',
    email: formData.get('email') as string,
    password: formData.get('password') as string
  });
}

export async function kakao() {
  await signIn('kakao');
}

export async function register(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // const user = await getUser(email); //사용자 조회
  // 사용자 조회에 따른 처리
  // if (user.length > 0) {
  //   return 'User already exists';
  // } else {
  //   await createUser(email, password);
  //   redirect('/login');
  // }
}
