'use server';

import { signIn } from '@/lib/auth';

export async function authenticate(formData: FormData) {
  await signIn('credentials', {
    redirectTo: '/',
    email: formData.get('email') as string,
    password: formData.get('password') as string
  });
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
