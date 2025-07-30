import { z } from 'zod';

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]).{8,}$/;

// 로그인 폼 유효성 검사 스키마
export const loginSchema = z.object({
  email: z.email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).regex(passwordValidation, {
    message: '비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
  })
});
// 회원가입 폼 유효성 검사 스키마
export const registerSchema = z.object({
  email: z.email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  username: z.string().max(8, { message: '닉네임은 8자 이하이어야 합니다.' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).regex(passwordValidation, {
    message: '비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다.'
  })
});

// Zod 스키마로부터 TypeScript 타입 추론
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
