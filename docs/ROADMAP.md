# ROADMAP: Notion CMS Blog (씨네로그 / CineLog)

## Phase 1: 프로젝트 초기 설정 (골격)

### 1-1. 환경 변수 설정
- `.env.local` 파일 생성
- `NOTION_API_KEY`, `NOTION_DATABASE_ID` 변수 정의
- `.env.example` 파일 생성 (키 값 제외)

### 1-2. Notion 패키지 설치
- `@notionhq/client` 설치
- `@types/node` 확인

### 1-3. 라우트 골격 생성
- `app/movies/[id]/page.tsx` 생성 (빈 페이지)
- `app/watchlist/page.tsx` 생성 (빈 페이지, 2차)

### 1-4. 메타데이터 업데이트
- `app/layout.tsx`의 `metadata` 를 씨네로그 브랜드로 변경
- Header 로고/링크 씨네로그로 변경

---

## Phase 2: 공통 모듈 개발

### 2-1. Notion API 클라이언트 (`lib/notion.ts`)
- `Client` 인스턴스 생성
- `Movie` 인터페이스 정의 (모든 DB 필드 타입 포함)
- `getMovies()` 함수: published=true 항목 최대 50건 조회
- `getMovieById(id)` 함수: 단건 조회
- Notion 응답 → `Movie` 타입 변환 헬퍼

### 2-2. 공통 유틸리티
- `lib/utils.ts`에 별점 변환 유틸 추가 (`ratingToStars`)
- 날짜 포맷 유틸 추가 (`formatDate`)

### 2-3. 공통 컴포넌트
- `components/movie/MovieCard.tsx`: 포스터 썸네일, 제목, 평점, 관람일
- `components/movie/StarRating.tsx`: 별점 시각화 (★☆)
- `components/movie/GenreBadge.tsx`: 장르 뱃지 (shadcn Badge 활용)
- `components/movie/MovieCardSkeleton.tsx`: 로딩 스켈레톤

---

## Phase 3: 핵심 기능 개발

### 3-1. 메인 페이지 (`app/page.tsx`)
- `getMovies()` 호출 (Server Component)
- `export const revalidate = 3600` 적용
- 3열 반응형 카드 그리드 렌더링
- 장르 필터 컴포넌트 (`GenreFilter`) — 클라이언트 사이드 필터링
- 빈 결과 상태 처리

### 3-2. 영화 상세 페이지 (`app/movies/[id]/page.tsx`)
- `generateStaticParams()` 구현
- `export const revalidate = 3600` 적용
- 좌: 포스터 이미지 / 우: 메타 정보 레이아웃
- 제목, 감독, 개봉 연도, 장르 뱃지
- 별점 시각화
- 감상평 본문
- 동적 메타태그 (`generateMetadata`)

---

## Phase 4: 추가 기능 개발

### 4-1. 위시리스트 페이지 (`app/watchlist/page.tsx`)
- `status` 기준 탭 필터: `보고 싶다` / `보는 중` / `봤다`
- 리스트 형태 (포스터 썸네일 + 제목 + 장르)

### 4-2. Header 네비게이션 업데이트
- 위시리스트 링크 추가

### 4-3. 에러 처리
- `app/not-found.tsx` 커스텀 404 페이지
- `app/error.tsx` 에러 바운더리
- Notion API 실패 시 Fallback UI

---

## Phase 5: 최적화 및 배포

### 5-1. 이미지 최적화
- `next/image` 컴포넌트로 포스터 이미지 최적화
- `next.config.ts`에 Notion 이미지 도메인 허용 (`images.remotePatterns`)

### 5-2. SEO
- 각 상세 페이지 `generateMetadata` 완성 (og:image, description)
- `app/sitemap.ts` 생성

### 5-3. 성능 점검
- Lighthouse 성능 점수 90+ 목표
- 불필요한 Client Component `"use client"` 제거

### 5-4. Vercel 배포
- 환경 변수 Vercel 프로젝트에 등록
- 프로덕션 배포 및 도메인 설정
