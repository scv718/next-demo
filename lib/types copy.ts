// import { type DefaultSession, type User as DefaultUser } from 'next-auth';
// import { type JWT as DefaultJWT } from 'next-auth/jwt';

// /**
//  * NextAuth의 기본 타입을 확장하여 우리가 사용할 속성들을 추가합니다.
//  * 이 파일은 tsconfig.json의 'include' 배열에 포함되어야 합니다.
//  */

// // User 인터페이스 확장: authorize 또는 signIn 콜백에서 반환되는 객체
// declare module 'next-auth' {
//   /**
//    * 스프링 부트 서버에서 받아오는 사용자 정보와 토큰을 포함하도록
//    * NextAuth의 기본 User 타입을 확장합니다.
//    */
//   interface User extends DefaultUser {
//     // 스프링 서버에서 발급한 토큰들
//     accessToken?: string;
//     refreshToken?: string;
//   }

//   /**
//    * 클라이언트에서 useSession() 등으로 조회하는 세션 객체의 타입입니다.
//    * JWT 토큰의 정보를 클라이언트에 어떻게 노출할지 결정합니다.
//    */
//   interface Session {
//     // 스프링 서버에서 발급한 액세스 토큰
//     accessToken?: string;
//     refreshToken?: string;

//     // 세션 에러 정보
//     error?: string;

//     // session.user 객체에 기본 속성(name, email, image) 외에
//     // 추가적인 속성을 정의하고 싶다면 여기에 추가합니다.
//     // & DefaultSession['user']는 기본 속성을 유지하기 위한 모범 사례입니다.
//     user: {
//       // 예: user.id를 세션에서 사용하고 싶을 경우
//       id?: string;
//     } & DefaultSession['user'];
//   }
// }

// // JWT 인터페이스 확장: jwt 콜백의 token 객체
// declare module 'next-auth/jwt' {
//   /**
//    * JWT 콜백에서 처리되는 토큰 객체의 타입입니다.
//    * 서버 사이드에서만 접근 가능하며, 여기에 중요한 정보를 담아 세션으로 전달합니다.
//    */
//   interface JWT extends DefaultJWT {
//     // 스프링 서버에서 발급한 토큰들
//     accessToken?: string;
//     refreshToken?: string;

//     // 세션 에러 정보
//     error?: string;

//     // `user` 객체를 `token`에 포함시켜 session 콜백으로 전달할 수 있습니다.
//     // `DefaultUser` 타입으로 기본적인 id, name, email, image를 포함합니다.
//     user?: DefaultUser;
//   }
// }
