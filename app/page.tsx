import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session ? (
        <div>
          <p>안녕하세요, {session.user?.name}님</p>
          <p>이메일, {session.user?.email}</p>
          <p>accessToken: {session.accessToken}</p>
          <p>refreshToken: {session.refreshToken}</p>
        </div>
      ) : (
        <div>
          <p>로그인되지 않았습니다.</p>
        </div>
      )}
    </div>
  );
}
