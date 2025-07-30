import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          // 스프링 부트 로그인 API 호출
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });

          const user = await res.json();

          // API 응답이 성공적이면 user 객체를 반환
          if (res.ok && user) {
            return user;
          }
        } catch (error) {
          console.error('Authorize Error:', error);

          return null;
        }
      }
    })
  ],
  // 콜백(callbacks), 페이지(pages) 설정 등은 여기에 계속 작성...
  callbacks: {
    // 3. signIn 콜백: 소셜 로그인 시 사용자 정보 처리
    async signIn({ user, account }) {
      // 소셜 로그인일 경우에만 실행 (예: google)
      if (account?.provider !== 'credentials') {
        try {
          // 스프링 부트 소셜 로그인 API 호출
          const res = await fetch(`${process.env.SPRING_API_URL}/api/auth/oauth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: account?.provider,
              token: account?.access_token
            })
          });

          if (!res.ok) {
            // 스프링 서버에서 에러 발생 시 로그인 실패 처리
            return false;
          }

          const springUser = await res.json();
          // 스프링에서 받은 토큰과 정보를 user 객체에 병합
          user.accessToken = springUser.accessToken;
          user.refreshToken = springUser.refreshToken;
        } catch (error) {
          console.error('Social Sign In Error:', error);

          return false;
        }
      }

      return true; // 로그인 계속 진행
    },

    // 4. jwt 콜백: JWT가 생성되거나 업데이트될 때마다 실행
    async jwt({ token, user, account }) {
      // user, account 객체는 로그인 직후에만 사용 가능
      if (user && account) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // TODO: Access Token 만료 시 Refresh Token으로 갱신하는 로직 추가

      return token;
    },

    // 5. session 콜백: 클라이언트에서 세션을 조회할 때마다 실행
    async session({ session, token }) {
      // jwt 콜백에서 넘겨준 정보를 세션에 담아 클라이언트로 전달
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    }
  },
  pages: {
    signIn: '/signin'
  },
  secret: process.env.AUTH_SECRET
});
