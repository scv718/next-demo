'use server';

import { redirect } from 'next/navigation';

import { registerSchema } from '@/lib/schema';

export interface ActionState {
  error?: string;
  details?: Record<string, string[]>;
}

export async function signUp(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. 폼 데이터를 객체로 변환하고 서버단에서 유효성 검사를 해요.
  const data = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce(
      (acc, issue) => {
        const path = issue.path.join('.'); // 필드 경로 (예: 'user.name')
        if (!acc[path]) {
          acc[path] = [];
        }
        acc[path].push(issue.message);

        return acc;
      },
      {} as Record<string, string[]>
    );

    return { error: '입력 값을 확인해주세요.', details: fieldErrors };
  }

  const { email, password, username, phoneNumber } = parsed.data;
  // 스프링 부트 회원가입 API 호출
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.MEMBER_SIGNUP}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      name: username,
      password: password,
      memberType: 'USER',
      phoneNumber: phoneNumber
    })
  });

  if (!res.ok) {
    // 이메일 중복 등 서버에서 실패한 내용
    return { error: '회원 가입에 실패했습니다.' };
  }

  // 5. 모든 과정 성공 시, 로그인 페이지로 이동
  redirect('/signin');
}
