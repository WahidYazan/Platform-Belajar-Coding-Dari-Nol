"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import type { UIMessage } from "ai"
import {
    X,
    Send,
    MessageSquare,
    Bot,
    User,
    History,
    Plus,
    Trash2,
    ArrowLeft,
} from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useChatSessions } from "@/hooks/use-chat-sessions"
import { createClient } from "@/lib/supabase/client"

function getTextFromMessage(message: UIMessage): string {
    return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("")
}

function formatTime(ts: number): string {
    const d = new Date(ts)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return "Baru saja"
    if (diffMin < 60) return `${diffMin}m lalu`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}j lalu`
    const diffDay = Math.floor(diffHr / 24)
    if (diffDay < 7) return `${diffDay}h lalu`
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

type View = "chat" | "history"

export function ChatWidget() {
    const [open, setOpen] = React.useState(false)
    const [view, setView] = React.useState<View>("chat")
    const inputRef = React.useRef<HTMLTextAreaElement>(null)
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [input, setInput] = React.useState("")
    const [userId, setUserId] = React.useState<string | null>(null)

    const {
        sessions,
        activeSession,
        activeId,
        createSession,
        updateSession,
        deleteSession,
        setActiveId,
    } = useChatSessions(userId)

    const chat = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    })

    const { messages, setMessages, status, sendMessage } = chat
    const isLoading = status === "submitted" || status === "streaming"

    React.useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id ?? null)
        })
    }, [])

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    React.useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [open])

    const activeSessionRef = React.useRef(activeSession)
    const updateSessionRef = React.useRef(updateSession)
    const setMessagesRef = React.useRef(setMessages)

    React.useEffect(() => {
        activeSessionRef.current = activeSession
    })
    React.useEffect(() => {
        updateSessionRef.current = updateSession
    })
    React.useEffect(() => {
        setMessagesRef.current = setMessages
    })

    React.useEffect(() => {
        const session = activeSessionRef.current
        if (!activeId || !session) return
        setMessagesRef.current(session.messages)
    }, [activeId])

    React.useEffect(() => {
        if (!activeId || messages.length === 0) return
        const timeout = setTimeout(() => {
            updateSessionRef.current(activeId, messages)
        }, 500)
        return () => clearTimeout(timeout)
    }, [messages, activeId])

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        const trimmed = input.trim()
        if (!trimmed || isLoading) return

        if (!activeId) {
            const session = createSession()
            if (session) {
                setTimeout(() => {
                    sendMessage({ text: trimmed })
                    setInput("")
                }, 50)
                return
            }
        }

        sendMessage({ text: trimmed })
        setInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    const handleNewChat = () => {
        createSession()
        setMessages([])
        setView("chat")
    }

    const handleSelectSession = (id: string) => {
        setActiveId(id)
        setView("chat")
    }

    const handleDeleteSession = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        deleteSession(id)
    }

    const quickQuestions = ["Apa itu React?", "Tips belajar JavaScript", "Cara deploy Next.js"]

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    size="icon-lg"
                    className={cn(
                        "size-14 rounded-full shadow-lg transition-all duration-200",
                        open
                            ? "bg-muted hover:bg-muted/80 text-muted-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Tutup chat" : "Buka AI Assistant"}
                >
                    {open ? <X className="size-5" /> : <MessageSquare className="size-5" />}
                </Button>
            </div>

            {open && (
                <div className="fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
                    {view === "history" ? (
                        <>
                            <div className="flex items-center gap-2 border-b px-4 py-3">
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => setView("chat")}
                                    className="shrink-0"
                                >
                                    <ArrowLeft className="size-4" />
                                </Button>
                                <h3 className="flex-1 text-sm font-semibold">Riwayat Chat</h3>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={handleNewChat}
                                    className="shrink-0"
                                >
                                    <Plus className="size-4" />
                                </Button>
                            </div>
                            <div className="overflow-y-auto" style={{ maxHeight: "430px" }}>
                                {sessions.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                                        <History className="size-8 text-muted-foreground/40" />
                                        <p className="text-xs text-muted-foreground">
                                            Belum ada riwayat chat
                                        </p>
                                    </div>
                                ) : (
                                    sessions.map((s) => (
                                        <div
                                            key={s.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleSelectSession(s.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") handleSelectSession(s.id)
                                            }}
                                            className={cn(
                                                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted",
                                                s.id === activeId && "bg-muted"
                                            )}
                                        >
                                            <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate text-sm">{s.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {s.messages.length} pesan &middot; {formatTime(s.createdAt)}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                onClick={(e) => handleDeleteSession(e, s.id)}
                                                className="shrink-0 text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 border-b px-4 py-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Bot className="size-4" />
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">Pembantu Di Web Sinau Coding</h3>
                                    <p className="text-xs text-muted-foreground">Sinau Coding</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={handleNewChat}
                                    className="shrink-0"
                                    aria-label="Chat baru"
                                >
                                    <Plus className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => setView("history")}
                                    className="shrink-0"
                                    aria-label="Riwayat chat"
                                >
                                    <History className="size-4" />
                                </Button>
                            </div>

                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-4 py-3"
                                style={{ maxHeight: "400px", minHeight: "300px" }}
                            >
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                                        <span className="flex size-12 items-center justify-center rounded-full bg-muted">
                                            <Bot className="size-6 text-muted-foreground" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Halo! Ada yang bisa dibantu?
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Tanya apa saja tentang coding
                                            </p>
                                        </div>
                                        <div className="mt-2 flex flex-wrap justify-center gap-2">
                                            {quickQuestions.map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => {
                                                        setInput(q)
                                                        setTimeout(() => {
                                                            sendMessage({ text: q })
                                                            setInput("")
                                                        }, 0)
                                                    }}
                                                    className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((m) => {
                                    const text = getTextFromMessage(m)
                                    return (
                                        <div
                                            key={m.id}
                                            className={cn(
                                                "mb-3 flex gap-2",
                                                m.role === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            )}
                                        >
                                            {m.role === "assistant" && (
                                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                                                    <Bot className="size-3" />
                                                </span>
                                            )}
                                            <div
                                                className={cn(
                                                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                                                    m.role === "user"
                                                        ? "rounded-br-md bg-primary text-primary-foreground"
                                                        : "rounded-bl-md bg-muted"
                                                )}
                                            >
                                                <p className="whitespace-pre-wrap break-words">
                                                    {text}
                                                </p>
                                            </div>
                                            {m.role === "user" && (
                                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <User className="size-3" />
                                                </span>
                                            )}
                                        </div>
                                    )
                                })}

                                {isLoading &&
                                    messages[messages.length - 1]?.role !== "assistant" && (
                                        <div className="flex gap-2">
                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                                                <Bot className="size-3" />
                                            </span>
                                            <div className="rounded-2xl rounded-bl-md bg-muted px-3 py-2">
                                                <div className="flex gap-1">
                                                    <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.3s]" />
                                                    <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:-0.15s]" />
                                                    <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/40" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <form onSubmit={handleSubmit} className="border-t px-4 py-3">
                                <div className="flex items-end gap-2">
                                    <textarea
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Tanya tentang coding..."
                                        rows={1}
                                        className="flex-1 resize-none rounded-xl border bg-muted/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                                        style={{ maxHeight: "120px" }}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="shrink-0 rounded-full"
                                    >
                                        <Send className="size-4" />
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
