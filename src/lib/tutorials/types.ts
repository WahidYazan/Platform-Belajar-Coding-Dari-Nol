export type CodeBlock = {
  lang: string
  filename?: string
  code: string
}

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; filename?: string; code: string }
  | { type: "callout"; title: string; tone?: "info" | "tip" | "warning"; text: string }

export type Tutorial = {
  slug: string
  title: string
  description: string
  category: string
  level: "Pemula" | "Menengah" | "Lanjutan"
  minutes: number
  date: string
  content: ContentBlock[]
}
