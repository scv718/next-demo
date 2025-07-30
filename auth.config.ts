import inMemoryAuthConfig from './lib/auth_config_callback/inmemory.test';
import SpringBackendAuthConfig from './lib/auth_config_callback/rest.api';
import type { NextAuthConfig } from 'next-auth';

const config = process.env.AUTH_STRATEGY === 'inmemory' ? inMemoryAuthConfig : SpringBackendAuthConfig;

export const authConfig = {
  ...config,
  providers: [],
  pages: {
    signIn: '/signin'
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
