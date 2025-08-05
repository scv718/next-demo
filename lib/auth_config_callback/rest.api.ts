import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  callbacks: {
    async signIn({ user, account }) {
      // 소셜 로그인일 경우에만 실행 (예: google)
      if (account?.provider !== 'credentials') {
        try {
          // 스프링 부트 소셜 로그인 API 호출
          const res = await fetch(`${process.env.SPRING_API_URL}/auth/oauth`, {
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
      return session;
    }
  }
} satisfies NextAuthConfig;
