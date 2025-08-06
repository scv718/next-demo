import { signInWithCredentials, signInWithSocial } from '@/lib/services/authService';

import NextAuth from 'next-auth';
import type { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (credentials.email && credentials.password) {
            return await signInWithCredentials(credentials.email, credentials.password);
          }

          return null;
        } catch (error) {
          console.error('Authorize Error:', error);

          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === 'credentials') {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.user = user;
        } else if (['kakao', 'google', 'naver'].includes(account.provider)) {
          try {
            const user = await signInWithSocial(account.provider, account.access_token);

            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
            token.user = user;
          } catch (error) {
            console.error('Error during social sign in JWT callback:', error);
            token.accessToken = undefined;

            return null;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;

      return session;
    }
  }
});
