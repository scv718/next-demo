'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  // 로딩 중일 때
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* status가 'authenticated' 이면 로그인 된 상태 */}
      {session ? (
        <div>
          <p>안녕하세요, {session.user?.name}님</p>
          {/* 이전 답변에서 추가한 accessToken에 접근 가능 */}
          <p>Your Token: {session.accessToken}</p>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인되지 않았습니다.</p>
          <button onClick={() => signIn()}>로그인</button>
        </div>
      )}
    </div>
  );
}
