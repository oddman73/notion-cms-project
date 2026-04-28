# Notion CMS Blog (씨네로그 / CineLog) 개발 규칙

## 1. 프로젝트 개요

- **프로젝트명**: Notion CMS Blog (씨네로그 / CineLog)
- **목적**: Notion API를 CMS로 활용한 개인 영화 감상 기록 블로그
- **스택**: Next.js 15 (App Router) · TypeScript 5 (strict) · TailwindCSS v4 · shadcn/ui (radix-nova) · `@notionhq/client`
- **배포**: Vercel (ISR 기반 정적 생성)
- **주요 패키지 버전**: next `16.2.4` · react `19.2.4` · tailwindcss `^4` · radix-ui `^1.4.3` · eslint `^9`

---

## 2. 디렉토리 구조 및 파일 책임

| 경로 | 책임 |
|------|------|
| `app/` | App Router 페이지 및 레이아웃 |
| `app/layout.tsx` | 전역 Shell (ThemeProvider, Header, Footer 포함) |
| `app/globals.css` | TailwindCSS v4 설정, CSS 변수, 테마 |
| `components/ui/` | shadcn/ui 컴포넌트 (직접 수정 가능) |
| `components/theme/` | 커스텀 테마 시스템 |
| `components/layout/` | Header, Footer |
| `lib/notion.ts` | Notion API 클라이언트 및 데이터 fetch 함수 (유일한 Notion 접근 지점) |
| `lib/utils.ts` | `cn()` 유틸리티만 |
| `docs/PRD.md` | 요구사항 명세 (수정 금지) |

---

## 3. Notion API 규칙

- **모든 Notion 데이터 접근은 `lib/notion.ts`를 통해서만 수행** — 페이지 컴포넌트에서 직접 `@notionhq/client` 호출 금지
- 환경변수 `NOTION_API_KEY`, `NOTION_DATABASE_ID`는 `.env.local`에 정의 — 코드에 하드코딩 절대 금지
- **`published` 필드가 `true`인 항목만 쿼리** — 초안(false) 노출 금지
- Notion 데이터베이스 필드 매핑:

```ts
// lib/notion.ts 에서 사용하는 필드 이름 (변경 금지)
title, poster_url, genre, rating, watched_at, status, review, director, release_year, published
```

- `status` 필드 허용값: `봤다` / `보는 중` / `보고 싶다`

---

## 4. 데이터 페칭 및 렌더링 규칙

- **Server Component에서만 Notion 데이터를 fetch** — Client Component에서 직접 fetch 금지
- 모든 페이지에 **ISR 적용**: `export const revalidate = 3600`
- 최초 목록 조회는 최대 50건 고정 (페이지네이션 MVP 제외)
- 동적 라우트 `/movies/[id]`에서 `generateStaticParams()` 구현 필수

```ts
// 올바른 예시
export const revalidate = 3600

export default async function MovieListPage() {
  const movies = await getMovies() // lib/notion.ts 함수 호출
  // ...
}
```

---

## 5. 라우트 구조

| 라우트 | 파일 | 상태 |
|--------|------|------|
| `/` | `app/page.tsx` | MVP |
| `/movies/[id]` | `app/movies/[id]/page.tsx` | MVP |
| `/watchlist` | `app/watchlist/page.tsx` | 2차 (현재 미구현) |

- **새 페이지 추가 시** `app/` 하위에 폴더+`page.tsx` 구조로 생성
- `layout.tsx`는 전역 Shell이므로 페이지별 레이아웃 변경이 필요하면 해당 라우트 세그먼트에 별도 `layout.tsx` 추가

---

## 6. 테마 시스템 규칙

- **`next-themes` 패키지 사용 절대 금지** — 커스텀 ThemeProvider 사용
- 테마 읽기/변경: `useTheme()` 훅 (`components/theme/theme-provider.tsx`) — ThemeProvider 내부에서만 호출 가능
- 다크모드 CSS: `@custom-variant dark (&:is(.dark *))` (globals.css) 방식 사용 — `prefers-color-scheme` 미디어쿼리 직접 사용 금지
- 테마 저장소: `localStorage` key `theme` — 다른 key 사용 금지

---

## 7. TailwindCSS v4 규칙

- **`tailwind.config.js` 파일 생성 금지** — 설정은 `app/globals.css`에서만
- 새 CSS 변수 추가 시 `app/globals.css`의 `@theme inline` 블록 내에 추가
- 색상 토큰은 `oklch()` 형식 사용 (기존 변수 형식 일치)
- `@import "tailwindcss"` 사용 — v3의 `@tailwind base/components/utilities` 구문 사용 금지

---

## 8. shadcn/ui 및 Radix UI 규칙

- **새 shadcn 컴포넌트 추가**: 반드시 `npx shadcn add [component-name]` 명령 사용 — 직접 파일 생성 금지
- **개별 `@radix-ui/react-*` 패키지 설치 금지** — 통합 `radix-ui` 패키지만 사용
- Slot 임포트: `import { Slot } from "radix-ui"` → `<Slot.Root>` 로 사용

```ts
// 올바른 임포트
import { Slot } from "radix-ui"

// 금지된 임포트
import { Slot } from "@radix-ui/react-slot" // ❌
```

---

## 9. 컴포넌트 작성 규칙

- UI 컴포넌트 변형은 `cva()` (class-variance-authority) 로 정의
- 클래스 병합은 항상 `cn()` 사용 (`lib/utils.ts`)
- 경로 별칭 `@/*`를 절대경로로 사용 — 상대경로 `../../` 사용 금지
- 아이콘: `lucide-react` 패키지만 사용

```ts
// 올바른 예시
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
```

---

## 10. TypeScript 규칙

- **`strict: true` 필수** (`tsconfig.json`에 설정됨) — 절대 해제 금지
- `any` 타입 사용 금지 — Notion API 응답은 반드시 타입 가드 또는 명시적 타입으로 변환
- Notion 데이터 모델은 `lib/notion.ts` 내에 `interface` 또는 `type`으로 선언

```ts
// 올바른 예시 — Notion 응답 타입 정의
interface Movie {
  id: string
  title: string
  posterUrl: string
  genre: string[]
  rating: number
  watchedAt: string
  status: "봤다" | "보는 중" | "보고 싶다"
  review: string
  director: string
  releaseYear: number
}

// 금지 — any 사용
const movie: any = await notion.pages.retrieve(...) // ❌
```

- `moduleResolution: "bundler"` 사용 — 경로 별칭 `@/*`는 `tsconfig.json` `paths`에 정의된 것만 사용
- 함수 반환 타입은 명시적으로 선언 (void, Promise<T> 등)

---

## 11. ESLint 규칙

- **`npm run lint` 통과가 커밋 전 필수 조건**
- 설정: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` 적용 중
- ESLint 규칙 비활성화(`// eslint-disable`) 사용 금지 — 근본 원인 수정
- `@typescript-eslint` 규칙 위반 시 타입 구조를 수정하여 해결

---

## 12. 언어 규칙

- 주석: 한국어
- 변수명/함수명: 영어 (camelCase)
- 파일명: kebab-case
- 커밋 메시지: 한국어

---

## 13. 주요 파일 연동 규칙

- **Notion 필드 추가/변경** → `lib/notion.ts` 타입 정의 + fetch 함수 동시 수정
- **새 페이지 추가** → `app/` 하위 라우트 생성 + `app/layout.tsx`의 Header 네비게이션 링크 동시 추가
- **새 shadcn 컴포넌트** → `npx shadcn add` 실행 → `components.json` 자동 업데이트됨 (수동 편집 금지)
- **CSS 변수 추가** → `:root` 블록 + `.dark` 블록 양쪽에 동시 추가

---

## 14. 금지 사항

- `lib/notion.ts` 외부에서 `@notionhq/client` 직접 import
- `published: false` 데이터를 UI에 노출
- `next-themes` 설치 또는 사용
- 개별 `@radix-ui/react-*` 패키지 설치
- `tailwind.config.js` 파일 생성
- 환경변수 값을 소스코드에 하드코딩
- Client Component에서 Notion API fetch
- ISR `revalidate` 없이 페이지 생성
- `components/ui/` 내 shadcn 컴포넌트를 CLI 없이 수동 생성
- `tsconfig.json`의 `strict` 옵션 비활성화
- `any` 타입 사용
- `// eslint-disable` 주석으로 ESLint 규칙 우회
