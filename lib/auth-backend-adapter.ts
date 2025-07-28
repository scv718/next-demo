// src/lib/custom-adapter.ts
import type { Adapter, AdapterUser } from 'next-auth/adapters';

/**
 * 백엔드 API를 호출하는 커스텀 어댑터입니다.
 * 모든 DB 작업을 백엔드 서버에 위임합니다.
 */
export function AuthAdapter(): Adapter {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL!; // 백엔드 서버 주소

  return {
    // 필요한 모든 어댑터 함수들을 여기에 구현합니다.
    // 각 함수는 fetch를 사용해 백엔드 API를 호출합니다.
    async createUser(user) {
      console.log('어댑터: createUser 호출');
      const res = await fetch(`${backendUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (!res.ok) return null;

      return await res.json();
    },
    async getUserByEmail(email) {
      console.log('어댑터: getUserByEmail 호출');
      const res = await fetch(`${backendUrl}/users/by-email/${email}`);
      if (!res.ok) return null;

      return await res.json();
    },
    // getUserByAccount, linkAccount, createSession, getSessionAndUser 등
    // 필요한 다른 함수들도 위와 같은 방식으로 구현해야 합니다.
    // 지금은 예시를 위해 일부만 구현합니다.
    getUser: async (id) => {
      return null;
    },
    getUserByAccount: async (providerAccountId) => {
      return null;
    },
    updateUser: async (user) => {
      return user as AdapterUser;
    },
    linkAccount: async (account) => {}
  };
}
