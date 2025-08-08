import type { User } from 'next-auth';

/**
 * 아이디/비밀번호 기반으로 백엔드에 로그인을 요청하는 함수
 */
export async function signInWithCredentials(email: string | unknown, password: string | unknown): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.MEMBER_LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  if (!res.ok) {
    // API 요청 실패 시 에러를 발생시켜 호출한 쪽에서 처리하도록 합니다.
    throw new Error('Backend credentials sign in failed');
  }

  const response: BackendAuthResponse = await res.json();

  return {
    name: response.data.member.name,
    email: response.data.member.email,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  };
}

/**
 * 소셜 로그인 정보를 바탕으로 백엔드에 인증을 요청하는 함수
 */
export async function signInWithSocial(provider: string, accessToken: string | undefined): Promise<User> {
  const res = await fetch(`${process.env.SPRING_API_URL}${process.env.SOCIAL_AUTH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: provider,
      token: accessToken
    })
  });

  if (!res.ok) {
    throw new Error('Backend social auth failed');
  }

  const response: BackendAuthResponse = await res.json();

  return {
    name: response.data.member?.name,
    email: response.data.member?.email,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  };
}
