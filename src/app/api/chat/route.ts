import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `Kamu adalah asisten AI untuk "Sinau Coding" — platform belajar coding dalam Bahasa Indonesia.
Kamu ahli dalam pemrograman: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, PHP, Laravel, Python, database, deployment, dan topik coding lainnya.
Jawab pertanyaan user dengan jelas, singkat, dan praktis. Gunakan Bahasa Indonesia.
Jika ditanya tentang kode, berikan contoh kode yang relevan.
Jika ditanya di luar konteks coding, tetap bantu dengan ramah tapi arahkan kembali ke topik coding jika sesuai.`

export async function POST(request: Request) {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const modelMessages = await convertToModelMessages(messages)

    const result = streamText({
        model: google("gemini-2.5-flash"),
        system: SYSTEM_PROMPT,
        messages: modelMessages,
    })

    return result.toUIMessageStreamResponse()
}
