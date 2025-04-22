"use client"

import type { AgentsSuggestions } from "@/app/types/agent"
import { AIDA_AGENTS_SLUGS } from "@/lib/config"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import React, { memo, useEffect, useMemo, useState } from "react"
import { Agents } from "./agents"
import { Suggestions } from "./suggestions"
import { Message, CreateMessage } from "ai"

interface PromptSystemProps {
  onValueChange: (value: string) => void
  onSuggestion: (suggestion: string) => void
  onSelectSystemPrompt: (systemPrompt: string) => void
  value: string
  setSelectedAgentId: (agentId: string | null) => void
  selectedAgentId: string | null
  append?: (message: Message | CreateMessage) => Promise<string | null | undefined>
  setHasSubmitted?: React.Dispatch<React.SetStateAction<boolean>>
}

export const PromptSystem = memo(function PromptSystem({
  onValueChange,
  onSuggestion,
  onSelectSystemPrompt,
  value,
  setSelectedAgentId,
  selectedAgentId,
  append,
  setHasSubmitted,
}: PromptSystemProps) {
  const [isAgentMode, setIsAgentMode] = useState(false)
  const [sugestedAgents, setSugestedAgents] = useState<AgentsSuggestions[]>([])

  useEffect(() => {
    const fetchAgents = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("agents")
        .select("id, name, description, avatar_url")
        .in("slug", AIDA_AGENTS_SLUGS)

      if (error) {
        console.error("Error fetching agents:", error.message)
        return
      }

      const randomAgents = data
        ?.sort(() => Math.random() - 0.5)
        .slice(0, 8) as AgentsSuggestions[]

      setSugestedAgents(randomAgents)
    }
    fetchAgents()
  }, [])

  const tabs = useMemo(
    () => [
      {
        id: "agents",
        label: "Agents",
        isActive: isAgentMode,
        onClick: () => {
          setIsAgentMode(true)
          onSelectSystemPrompt("")
          setSelectedAgentId(null)
        },
      },
      {
        id: "suggestions",
        label: "Suggestions",
        isActive: !isAgentMode,
        onClick: () => {
          setIsAgentMode(false)
          onSelectSystemPrompt("")
          setSelectedAgentId(null)
        },
      },
    ],
    [isAgentMode, onSelectSystemPrompt, setSelectedAgentId]
  )

  return (
    <>
      <div className="relative order-1 w-full md:order-2">
        <AnimatePresence mode="popLayout">
          {isAgentMode ? (
            <Agents
              key="agents"
              setSelectedAgentId={setSelectedAgentId}
              selectedAgentId={selectedAgentId}
              sugestedAgents={sugestedAgents}
            />
          ) : (
            <Suggestions
              key="suggestions"
              onValueChange={onValueChange}
              onSuggestion={onSuggestion}
              value={value}
              append={append!}
              setHasSubmitted={setHasSubmitted!}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="relative mx-auto mb-4 flex h-9 w-auto items-center justify-center rounded-lg p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="relative flex h-full flex-row gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "relative z-10 flex h-full flex-1 items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors active:scale-[0.98]",
                tab.isActive
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
              onClick={tab.onClick}
              type="button"
            >
              <AnimatePresence initial={false}>
                {tab.isActive && (
                  <motion.div
                    layoutId="background"
                    className="absolute inset-0 z-0 bg-white dark:bg-neutral-900 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-800"
                    transition={{
                      duration: 0.25,
                      type: "spring",
                      bounce: 0,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
})