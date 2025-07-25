import { authConfig } from '@/auth.config';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
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
  ]
});
