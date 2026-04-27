# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

ShadcnUI 컴포넌트 추가:
```bash
npx shadcn add [component-name]
```

## 아키텍처 개요

**스택**: Next.js 16.2.4 (App Router) · React 19 · TypeScript · TailwindCSS v4 · ShadcnUI (radix-nova 스타일)

**디렉토리 구조**:
- `app/` — App Router 페이지 및 레이아웃. `layout.tsx`가 ThemeProvider, Header, Footer를 포함한 셸을 구성
- `components/ui/` — ShadcnUI 컴포넌트 (Button, Card, Badge 등). 직접 수정 가능한 소스
- `components/theme/` — 커스텀 테마 시스템 (ThemeProvider, ThemeToggle)
- `components/layout/` — Header, Footer 레이아웃 컴포넌트
- `lib/utils.ts` — `cn()` 유틸리티 (`clsx` + `tailwind-merge`)

**경로 별칭**: `@/*`는 프로젝트 루트에 매핑 (예: `@/components/ui/button`)

## 주요 패턴 및 주의사항

### TailwindCSS v4
- `tailwind.config.js` 파일 없음. 설정은 `app/globals.css`의 `@theme inline` 블록에서 CSS 변수로 관리
- `@import "tailwindcss"` 방식 사용 (v3의 `@tailwind base/components/utilities`와 다름)

### ShadcnUI / Radix UI
- 개별 `@radix-ui/react-*` 패키지가 아닌 통합 `radix-ui` 패키지 사용
- Slot은 `import { Slot } from "radix-ui"`로 임포트 (`Slot.Root`로 사용)
- `components.json` 스타일: `radix-nova`

### 테마 시스템
- `next-themes`를 사용하지 않음. 커스텀 `ThemeProvider`가 localStorage에 테마를 저장하고 `<html>`에 `.dark` 클래스를 토글
- 다크모드 감지: `@custom-variant dark (&:is(.dark *))` (globals.css)
- 컴포넌트에서 테마 접근: `useTheme()` 훅 (ThemeProvider 내부에서만 사용 가능)

### 컴포넌트 변형 (CVA)
- UI 컴포넌트는 `class-variance-authority`의 `cva()`로 변형을 정의
- 클래스 병합은 항상 `cn()` 사용
