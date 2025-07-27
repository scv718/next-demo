// /* eslint-disable import/named */
// import { DefaultSession } from 'next-auth';

// // 기존 'next-auth' 모듈의 타입을 확장합니다.
// declare module 'next-auth' {
//   /**
//    * `session` 콜백에서 반환되는 Session 객체의 타입을 확장합니다.
//    * user 객체에 `id` 속성을 추가합니다.
//    */
//   interface Session {
//     user: {
//       id: string; // 여기에 커스텀 속성을 추가합니다.
//     } & DefaultSession['user']; // 기존 user 타입(name, email, image)을 유지합니다.
//   }
// }
