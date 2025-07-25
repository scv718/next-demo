import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  pluginJs.configs.recommended, // ? https://github.com/eslint/eslint
  importPlugin.flatConfigs.recommended, // ? https://github.com/import-js/eslint-plugin-import
  ...tseslint.configs.recommended, // ? https://github.com/typescript-eslint/typescript-eslint
  pluginPromise.configs['flat/recommended'], // ? https://github.com/eslint-community/eslint-plugin-promise
  pluginReact.configs.flat.recommended, // ? https://github.com/jsx-eslint/eslint-plugin-react
  pluginReact.configs.flat['jsx-runtime'], // ? https://github.com/jsx-eslint/eslint-plugin-react
  eslintConfigPrettier, // ? https://github.com/prettier/eslint-config-prettier
  {
    rules: {
      'no-unused-vars': 'off', //사용하지 않는 변수가 있어도 경고나 에러를 표시하지 않습니다.
      'react/react-in-jsx-scope': 'off', //JSX를 사용하는 파일에서 import React from 'react' 구문이 없어도 에러를 발생시키지 않습니다.
      'react-hooks/exhaustive-deps': 'off', //useEffect나 useCallback 같은 React Hook의 의존성 배열([])에 모든 종속 항목을 포함했는지 확인하는 규칙을 끕니다.
      'react/display-name': 'off', //React 컴포넌트에 displayName 속성이 없어도 에러를 표시하지 않습니다.
      'react/prop-types': 'off', //컴포넌트의 props에 대한 타입 검사(PropTypes)를 강제하지 않습니다.
      'newline-before-return': 'error', //return 문 바로 앞에 항상 빈 줄이 있도록 강제합니다.
      '@typescript-eslint/no-unused-vars': 'off', //TypeScript 코드에서 사용하지 않는 변수나 타입이 있어도 에러를 표시하지 않습니다.
      '@typescript-eslint/no-unused-expressions': 'off', //아무런 효과가 없는 표현식(예: 단독으로 사용된 함수 호출)을 허용합니다.
      'import/no-unresolved': 'off', //import한 모듈의 경로를 찾을 수 없는 경우에도 에러를 표시하지 않습니다.
      'import/no-named-as-default': 'off', //named export (예: export { a })를 default import (예: import a from ...)로 가져오는 것을 허용합니다.
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      'no-undefined': 'error' // undefined 식별자 사용 금지
    }
  },
  // ! ===================== DISCLAIMER =====================
  // ! There is no official solution available for new ESLint 9 flat config structure for NextJS
  // ! The solution is taken from the community and may not be the best practice, use it at your own risk
  // ? Ref: https://github.com/vercel/next.js/discussions/49337?sort=top#discussioncomment-5998603
  // ! ======================================================
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off'
    }
  },
  {
    ignores: ['.next/*']
  }
];
