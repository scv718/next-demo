import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  callbacks: {
    async signIn({ user, account }) {
      return true; // 로그인 계속 진행
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    // 클라이언트 세션에 사용자 ID 추가
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    }
  }
} satisfies NextAuthConfig;
