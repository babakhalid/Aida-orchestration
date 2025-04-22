"use client"

import { PromptSuggestion } from "@/components/prompt-kit/prompt-suggestion"
import { TRANSITION_SUGGESTIONS } from "@/lib/motion"
import { AnimatePresence, motion } from "motion/react"
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { SUGGESTIONS as SUGGESTIONS_CONFIG } from "@/lib/config"
import { Message, CreateMessage } from 'ai'
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft } from 'lucide-react'

type SuggestionsProps = {
  onValueChange: (value: string) => void
  onSuggestion: (suggestion: string) => void
  value?: string
  append: (message: Message | CreateMessage) => Promise<string | null | undefined>
  setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export const Suggestions = memo(function Suggestions({
  onValueChange,
  onSuggestion,
  value,
  append,
  setHasSubmitted,
}: SuggestionsProps) {
  const MotionPromptSuggestion = motion.create(PromptSuggestion)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const activeCategoryData = SUGGESTIONS_CONFIG.find(
    (group) => group.label === activeCategory
  )

  const showCategorySuggestions =
    activeCategoryData && activeCategoryData.items.length > 0

  useEffect(() => {
    if (!value) {
      setActiveCategory(null)
    }
  }, [value])

  const handleSuggestionClick = useCallback(
    async (suggestion: string) => {
      setActiveCategory(null)
      onValueChange(suggestion)
      onSuggestion(suggestion)
      setHasSubmitted(true)
      await append({
        content: suggestion,
        role: 'user',
      })
    },
    [onSuggestion, onValueChange, append, setHasSubmitted]
  )

  const handleCategoryClick = useCallback(
    (suggestion: { label: string; prompt: string }) => {
      setActiveCategory(suggestion.label)
      onValueChange(suggestion.prompt)
    },
    [onValueChange]
  )

  const suggestionsGrid = useMemo(
    () => (
      <motion.div
        key="suggestions-grid"
        className="flex w-full max-w-full flex-nowrap justify-start gap-3 overflow-x-auto px-4 py-2 md:mx-auto md:max-w-3xl md:flex-wrap md:justify-center md:px-0"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: -10, filter: "blur(4px)" },
        }}
        transition={TRANSITION_SUGGESTIONS}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SUGGESTIONS_CONFIG.map((suggestion, index) => (
          <MotionPromptSuggestion
            key={suggestion.label}
            onClick={() => handleCategoryClick(suggestion)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm",
              "text-neutral-900 dark:text-neutral-100 text-sm font-medium capitalize",
              "hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              ...TRANSITION_SUGGESTIONS,
              delay: index * 0.02,
            }}
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
            }}
          >
            <suggestion.icon className="size-4 text-neutral-600 dark:text-neutral-400" />
            {suggestion.label}
          </MotionPromptSuggestion>
        ))}
      </motion.div>
    ),
    [handleCategoryClick]
  )

  const suggestionsList = useMemo(
    () => (
      <motion.div
        className="w-full max-w-3xl mx-auto px-4 py-2"
        key={activeCategoryData?.label}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: -10, filter: "blur(4px)" },
        }}
        transition={TRANSITION_SUGGESTIONS}
      >
        <div className="flex items-center justify-start mb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400",
              "hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
            )}
          >
            <ChevronLeft className="size-4" />
            Back to Categories
          </button>
        </div>
        <ul className="space-y-1">
          {activeCategoryData?.items.map((suggestion: string, index) => (
            <MotionPromptSuggestion
              key={`${activeCategoryData?.label}-${suggestion}-${index}`}
              highlight={activeCategoryData.highlight}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "flex items-center gap-2 py-1.5 text-sm text-neutral-900 dark:text-neutral-100",
                "hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
              )}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 10 },
              }}
              transition={{
                ...TRANSITION_SUGGESTIONS,
                delay: index * 0.05,
              }}
            >
              <span className="flex-1 truncate text-left">{suggestion}</span>
              <ChevronRight className="size-4 text-neutral-400 dark:text-neutral-500 ml-auto" />
            </MotionPromptSuggestion>
          ))}
        </ul>
      </motion.div>
    ),
    [activeCategoryData, handleSuggestionClick]
  )

  return (
    <AnimatePresence mode="popLayout">
      {showCategorySuggestions ? suggestionsList : suggestionsGrid}
    </AnimatePresence>
  )
})