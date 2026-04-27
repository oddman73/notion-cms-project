import Link from "next/link"
import { ArrowRight, Blocks, Code2, ExternalLink, Layers, Palette, Rocket, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Next.js App Router",
    description:
      "서버 컴포넌트, 스트리밍, 중첩 레이아웃 등 최신 React 패러다임을 지원합니다.",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description:
      "타입 안정성으로 런타임 버그를 미리 잡고 IDE 자동완성의 혜택을 누리세요.",
  },
  {
    icon: Palette,
    title: "TailwindCSS v4",
    description:
      "유틸리티 우선 CSS 프레임워크로 일관된 디자인 시스템을 빠르게 구축하세요.",
  },
  {
    icon: Blocks,
    title: "ShadcnUI",
    description:
      "접근성을 고려한 아름다운 컴포넌트를 복사해서 바로 사용하세요.",
  },
  {
    icon: Layers,
    title: "lucide-react",
    description:
      "수백 가지의 픽셀 퍼펙트 아이콘으로 UI에 명확한 시각적 언어를 더하세요.",
  },
  {
    icon: Rocket,
    title: "즉시 배포 가능",
    description:
      "Vercel과의 완벽한 통합으로 코드 푸시 즉시 프로덕션 배포가 이루어집니다.",
  },
]

const stack = [
  { name: "Next.js", version: "v16" },
  { name: "React", version: "v19" },
  { name: "TypeScript", version: "v5" },
  { name: "TailwindCSS", version: "v4" },
  { name: "ShadcnUI", version: "Latest" },
  { name: "lucide-react", version: "Latest" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero 섹션 */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-36 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm">
          모던 웹 스타터킷
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
          빠르게 시작하고
          <br />
          <span className="text-muted-foreground">더 빠르게 완성하세요</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Next.js, TypeScript, TailwindCSS, ShadcnUI가 이미 세팅된 스타터킷으로
          <br className="hidden md:block" />
          환경 설정 없이 바로 아이디어 구현에 집중하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="#features">
              기능 살펴보기 <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" aria-hidden="true" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4">기능</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              모든 것이 준비되어 있습니다
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              개발에 필요한 모든 도구와 설정이 완료되어 있습니다. 바로 코딩을
              시작하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <feature.icon className="size-8 mb-2" aria-hidden="true" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section id="stack" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">기술 스택</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            검증된 기술로 구성되었습니다
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            현대적인 웹 개발의 표준으로 자리잡은 기술들의 조합입니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {stack.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 shadow-sm"
              >
                <span className="font-medium">{item.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {item.version}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section id="start" className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="text-center overflow-hidden">
            <CardContent className="p-10 md:p-16 bg-gradient-to-br from-muted/50 to-background">
              <Rocket className="size-12 mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                이 스타터킷을 클론하고 당신만의 프로젝트를 만들어보세요.
              </p>
              <div className="bg-muted rounded-lg px-6 py-4 font-mono text-sm mb-8 text-left overflow-x-auto">
                <span className="text-muted-foreground select-none">$ </span>
                <span>npx create-next-app@latest --example my-app</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                    문서 보기 <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    소스 보기
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
