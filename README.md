# Next Demo

Nextjs 15.4.3 기반의 웹 애플리케이션입니다.

## 🚀 빠른 시작

### 요구사항

- Node 22
- Docker & Docker Compose

### 개발 환경 시작

1. 컨테이너 개발 환경
- IDEA를 통핸 .devcontainer.json 실행

2. Local 개발 환경
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 📋 주요 기능

- **Nextauth 기반 표준 인증 기능

## 📁 프로젝트 구조

```
next-demo/
├── .devcontainer/
│   └── devcontainer.json                            # 개발 환경 설정
├── .vscode/
│   ├── extensions.json                              # devcontainer에 설치할 vscode 플러그인
│   ├── launch.json                                  # devcontainer에서 vscode 실행시 실행할 명령  
│   └── settings.json                                # devcontainer에서 vscode 설정
├── app/                                             # nextjs App router
│   ├── api/                                         # Node 서버 api
│   ├── [router]                                     # +1 Depth Router
│   ├── favicon.ico                                  # 파비콘
│   ├── globals.css                                  # 전역 css
│   ├── layout.tsx                                   # 해당 페이지 layout
│   └── page.tsx                                     # 해당 페이지 content
├── components/  
│   ├── button/                                      # 버튼 컴포넌트
│   ├── boxes/                                       # Box 컴포넌트
│   ├── form/                                        # 폼 컴포넌트
│   ├── inputs/                                      # Input 컴포넌트
│   └── links/                                       # 링크 컴포넌트
├── config/  
│   ├── .env.development                             # 개발용 환경변수
│   ├── .env.production                              # 운영용 환경변수
│   └── README.md                                    # 설명
├── lib/
│   ├── auth_config_callback/                        # 인증방식에 따라 구현된 authConfig (환경변수에 입력한 값에 따라 다름)
|   |   ├── inmemory.test.ts                         # nextjs 서버용으로 로컬 테스트 용도
│   |   └── rest.api.ts                              # REST API 서버에 요청하여 사용자 인증 및 조회 토큰 발급
│   ├── auth.ts                                      # Nextauth Provider (credential, social 등등)
│   ├── schema.ts                                    # 유효성 검사 스키마 모음
│   ├── types.ts                                     # 타입스크립트 타입 확장
│   └── utils.ts                                     # 유틸리티
├── public/                                          # static으로 접근 가능한 파일 모음
└── auth.config.ts/                                  # Nextauth 기본 설정
```
