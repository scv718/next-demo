import inMemoryAuthConfig from './lib/auth_config_callback/inmemory.test.integration';
import SpringBackendAuthConfig from './lib/auth_config_callback/spring.backend.integration';
import type { NextAuthConfig } from 'next-auth';

const TYPE = 'inmemory';
const config = TYPE === 'inmemory' ? inMemoryAuthConfig : SpringBackendAuthConfig;

export const authConfig = {
  ...config,
  providers: [],
  pages: {
    signIn: '/signin'
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
