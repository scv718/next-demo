import crypto from 'crypto';
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser } from 'next-auth/adapters';

/**
 * Node.js 메모리를 임시 DB처럼 사용합니다.
 * 서버가 재시작되면 모든 데이터는 초기화됩니다.
 */
const users: AdapterUser[] = [];
const accounts: AdapterAccount[] = [];
const sessions: AdapterSession[] = [];

export function AuthAdapter(): Adapter {
  return {
    async createUser(user) {
      const newUser = {
        ...user,
        id: crypto.randomUUID(),
        emailVerified: new Date() // 소셜 로그인은 보통 이메일이 검증된 것으로 간주
      };
      users.push(newUser);
      console.log('새로운 사용자 생성:', newUser);

      return newUser;
    },
    async getUser(id) {
      return users.find((user) => user.id === id) ?? null;
    },
    async getUserByEmail(email) {
      return users.find((user) => user.email === email) ?? null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = accounts.find((acc) => acc.provider === provider && acc.providerAccountId === providerAccountId);
      if (!account) return null;

      return users.find((user) => user.id === account.userId) ?? null;
    },
    async updateUser(user) {
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex === -1) throw new Error('User not found');
      users[userIndex] = { ...users[userIndex], ...user };

      return users[userIndex];
    },
    async linkAccount(account) {
      accounts.push({ ...account, id: crypto.randomUUID() });
      console.log('계정 연결:', account);
    },
    // --- 세션 관리 함수들 ---
    async createSession({ sessionToken, userId, expires }) {
      const newSession = { sessionToken, userId, expires };
      sessions.push(newSession);

      return newSession;
    },
    async getSessionAndUser(sessionToken) {
      const session = sessions.find((s) => s.sessionToken === sessionToken && s.expires > new Date());
      if (!session) return null;
      const user = users.find((u) => u.id === session.userId);
      if (!user) return null;

      return { session, user };
    },
    async deleteSession(sessionToken) {
      const sessionIndex = sessions.findIndex((s) => s.sessionToken === sessionToken);
      if (sessionIndex !== -1) sessions.splice(sessionIndex, 1);
    },
    async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) {
      const sessionIndex = sessions.findIndex((s) => s.sessionToken === session.sessionToken);
      if (sessionIndex === -1) return null;

      // 기존 세션 정보에 새로운 정보를 덮어씌웁니다.
      sessions[sessionIndex] = {
        ...sessions[sessionIndex],
        ...session
      };

      return sessions[sessionIndex];
    }
  };
}
