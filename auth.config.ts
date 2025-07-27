import type { NextAuthConfig } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authConfig = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    })
  ],
  // 콜백(callbacks), 페이지(pages) 설정 등은 여기에 계속 작성...
  callbacks: {
    // JWT에 백엔드에서 받은 사용자 ID 추가
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    // 클라이언트 세션에 사용자 ID 추가
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
} satisfies NextAuthConfig;
