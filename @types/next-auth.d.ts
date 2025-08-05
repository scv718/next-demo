import { type DefaultUser } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    // 스프링 서버에서 발급한 토큰들
    accessToken?: string;
    refreshToken?: string;
    error?: string;
    user?: User;
  }
}

declare module 'next-auth' {
  /**
   * `User` 타입은 authorize 콜백에서 반환되거나, 어댑터를 사용할 때 DB의 User 모델과 일치해야 합니다.
   * 이 인터페이스를 확장하여 기본 User 타입에 프로퍼티를 추가합니다.
   */
  interface User extends DefaultUser {
    // 스프링 서버에서 발급한 토큰들
    name: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    // role?: string;
  }

  /**
   * `Session` 타입은 `useSession()`, `getSession()` 호출 시 반환됩니다.
   * `user` 객체에 우리가 추가한 프로퍼티를 포함하도록 확장합니다.
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
    user?: User;
  }
}
