import Link from "next/link"
import { Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center px-4">
        <div className="flex items-center gap-2 mr-6">
          <Code2 className="size-5" aria-hidden="true" />
          <Link href="/" className="font-bold text-lg">
            StarterKit
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm flex-1">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            기능
          </Link>
          <Link
            href="#stack"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            기술스택
          </Link>
          <Link
            href="#start"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            시작하기
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="#start">시작하기</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
