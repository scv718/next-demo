// import { AuthAdapter } from './auth-backend-adapter';
import { AuthAdapter } from './auth-inmemory-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  // adapter: AuthAdapter(),
  adapter: AuthAdapter(),
  session: {
    strategy: 'database'
  },
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
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        console.log(email, password);

        return null;

        // try {
        //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       email: credentials.email,
        //       password: credentials.password
        //     })
        //   });

        //   const user = await res.json();
        //   if (res.ok && user) {
        //     return user;
        //   }

        //   return null;
        // } catch (error) {
        //   console.error('로그인 중 에러 발생:', error);

        //   return null;
        // }
      }
    })
  ],
  // 콜백(callbacks), 페이지(pages) 설정 등은 여기에 계속 작성...
  callbacks: {
    async session({ session, user }) {
      // `user` 객체는 어댑터나 authorize 함수에서 반환된 값입니다.
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
});
