"use client"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import * as React from "react"

type ProgressContextValue = {
  completed: string[]
  loading: boolean
  user: User | null
  toggle: (slug: string) => void
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = React.useState<string[]>([])
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()

    async function loadProgress(userId: string) {
      const { data } = await supabase
        .from("user_progress")
        .select("tutorial_slug")
        .eq("user_id", userId)
      setCompleted(data?.map(row => row.tutorial_slug) ?? [])
    }

    async function init() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      setUser(currentUser)
      if (currentUser) {
        await loadProgress(currentUser.id)
      }
      setLoading(false)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProgress(session.user.id)
      } else {
        setCompleted([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggle = React.useCallback(
    async (slug: string) => {
      const supabase = createClient()
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      if (!currentUser) return

      const isDone = completed.includes(slug)
      setCompleted(prev => (isDone ? prev.filter(item => item !== slug) : [...prev, slug]))

      if (isDone) {
        await supabase
          .from("user_progress")
          .delete()
          .match({ user_id: currentUser.id, tutorial_slug: slug })
      } else {
        await supabase.from("user_progress").insert({ user_id: currentUser.id, tutorial_slug: slug })
      }
    },
    [completed],
  )

  return (
    <ProgressContext.Provider value={{ completed, loading, user, toggle }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider")
  return ctx
}
