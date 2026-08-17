"use client"

import type { UIMessage } from "ai"
import * as React from "react"

export type ChatSession = {
    id: string
    title: string
    messages: UIMessage[]
    createdAt: number
}

function getStorageKey(userId: string): string {
    return `sinau-chat-sessions-${userId}`
}

function loadSessions(userId: string): ChatSession[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem(getStorageKey(userId))
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveSessions(userId: string, sessions: ChatSession[]) {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(sessions))
}

function extractTitle(messages: UIMessage[]): string {
    const firstUser = messages.find((m) => m.role === "user")
    if (!firstUser) return "New Chat"
    const text = firstUser.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("")
    return text.length > 40 ? text.slice(0, 40) + "..." : text
}

export function useChatSessions(userId: string | null) {
    const [sessions, setSessions] = React.useState<ChatSession[]>([])
    const [activeId, setActiveId] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!userId) return
        const loaded = loadSessions(userId)
        queueMicrotask(() => setSessions(loaded))
    }, [userId])

    const activeSession = React.useMemo(
        () => sessions.find((s) => s.id === activeId) ?? null,
        [sessions, activeId]
    )

    const createSession = React.useCallback((): ChatSession | null => {
        if (!userId) return null
        const session: ChatSession = {
            id: crypto.randomUUID(),
            title: "New Chat",
            messages: [],
            createdAt: Date.now(),
        }
        setSessions((prev) => {
            const next = [session, ...prev]
            saveSessions(userId, next)
            return next
        })
        setActiveId(session.id)
        return session
    }, [userId])

    const updateSession = React.useCallback(
        (id: string, messages: UIMessage[]) => {
            if (!userId) return
            setSessions((prev) => {
                const next = prev.map((s) =>
                    s.id === id
                        ? { ...s, messages, title: extractTitle(messages) }
                        : s
                )
                saveSessions(userId, next)
                return next
            })
        },
        [userId]
    )

    const deleteSession = React.useCallback(
        (id: string) => {
            if (!userId) return
            setSessions((prev) => {
                const next = prev.filter((s) => s.id !== id)
                saveSessions(userId, next)
                return next
            })
            if (activeId === id) setActiveId(null)
        },
        [userId, activeId]
    )

    return {
        sessions,
        activeSession,
        activeId,
        createSession,
        updateSession,
        deleteSession,
        setActiveId,
    }
}
