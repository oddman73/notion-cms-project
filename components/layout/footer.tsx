import Link from "next/link"
import { Code2, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="size-4" aria-hidden="true" />
            <span className="font-semibold">StarterKit</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Next.js · TypeScript · TailwindCSS · ShadcnUI · lucide-react
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              GitHub
            </Link>
            <span>© 2025 StarterKit</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
