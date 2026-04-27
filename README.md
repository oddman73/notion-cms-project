# 씨네로그 (CineLog)

> Notion을 CMS로 활용한 개인 영화 감상 기록 블로그

Notion 데이터베이스에 영화 정보를 입력하면 자동으로 웹에 반영되는 정적 블로그입니다.  
별도 관리자 페이지 없이 Notion에서 바로 콘텐츠를 관리할 수 있습니다.

## 주요 기능

- 영화 카드 목록 — 포스터·제목·평점·관람일 카드 그리드
- 장르 필터링 — 태그 클릭으로 장르별 영화 분류
- 영화 상세 페이지 — 감상평·감독·개봉 연도 등 상세 정보

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 15 (App Router), TypeScript |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS v4, shadcn/ui |
| Icons | Lucide React |
| 배포 | Vercel |

## 빠른 시작

### 1. 저장소 클론 및 의존성 설치

```bash
git clone https://github.com/{username}/cinelog.git
cd cinelog
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일에 Notion 정보를 입력합니다.

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxx
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## Notion 데이터베이스 구조

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `title` | Title | 영화 제목 |
| `poster_url` | URL | 포스터 이미지 URL |
| `genre` | Multi-select | 장르 태그 |
| `rating` | Number | 개인 평점 (0.0 ~ 5.0) |
| `watched_at` | Date | 관람일 |
| `status` | Select | 봤다 / 보는 중 / 보고 싶다 |
| `review` | Rich Text | 감상평 |
| `director` | Rich Text | 감독 이름 |
| `release_year` | Number | 개봉 연도 |
| `published` | Checkbox | 웹 노출 여부 |

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 문서

- [PRD (제품 요구사항 명세서)](./docs/PRD.md)

## 라이선스

MIT
