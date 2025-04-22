"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/config"
import { ArrowUp, Stop } from "@phosphor-icons/react"
import React, { useCallback } from "react"
import { ButtonFileUpload } from "./button-file-upload"
import { FileList } from "./file-list"
import { PromptSystem } from "./prompt-system"
import { SelectModel } from "./select-model"

interface ChatInputProps {
  value: string
  onValueChange: (value: string) => void
  onSend: () => void
  isSubmitting?: boolean
  hasMessages?: boolean
  files: File[]
  onFileUpload: (files: File[]) => void
  onFileRemove: (file: File) => void
  onSuggestion: (suggestion: string) => void
  hasSuggestions?: boolean
  onSelectModel: (model: string) => void
  selectedModel: string
  isUserAuthenticated: boolean
  onSelectSystemPrompt: (systemPrompt: string) => void
  systemPrompt?: string
  stop: () => void
  status?: "submitted" | "streaming" | "ready" | "error"
  setSelectedAgentId: (agentId: string | null) => void
  selectedAgentId: string | null
  placeholder?: string
}

export function ChatInput({
  value,
  onValueChange,
  onSend,
  isSubmitting = false,
  files,
  onFileUpload,
  onFileRemove,
  onSuggestion,
  hasSuggestions = false,
  onSelectModel,
  selectedModel,
  isUserAuthenticated,
  onSelectSystemPrompt,
  stop,
  status = "ready",
  setSelectedAgentId,
  selectedAgentId,
  placeholder = `Message ${APP_NAME}...`,
}: ChatInputProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isSubmitting || status === "streaming") {
        e.preventDefault()
        return
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        onSend()
      }
    },
    [onSend, isSubmitting, status]
  )

  const handleMainClick = () => {
    if (isSubmitting) return

    if (status === "streaming") {
      stop()
      return
    }

    onSend()
  }

  return (
    <div className="relative flex w-full flex-col gap-4">
      {hasSuggestions && (
        <PromptSystem
          onSelectSystemPrompt={onSelectSystemPrompt}
          onValueChange={onValueChange}
          onSuggestion={onSuggestion}
          value={value}
          setSelectedAgentId={setSelectedAgentId}
          selectedAgentId={selectedAgentId}
        />
      )}
      <div className="relative order-2 px-3 pb-4 sm:pb-6 md:order-1">
        <PromptInput
          className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 relative z-10 overflow-hidden border rounded-xl p-0 pb-3 shadow-sm"
          maxHeight={200}
          value={value}
          onValueChange={onValueChange}
        >
          <FileList files={files} onFileRemove={onFileRemove} />
          <PromptInputTextarea
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className="mt-3 ml-3 min-h-[48px] text-base leading-relaxed sm:text-base md:text-base text-neutral-900 dark:text-neutral-100"
          />
          <PromptInputActions className="mt-4 w-full justify-between px-3">
            <div className="flex gap-2">
              <ButtonFileUpload
                onFileUpload={onFileUpload}
                isUserAuthenticated={isUserAuthenticated}
                model={selectedModel}
              />
              <SelectModel
                selectedModel={selectedModel}
                onSelectModel={onSelectModel}
                isUserAuthenticated={isUserAuthenticated}
              />
            </div>
            <PromptInputAction
              tooltip={status === "streaming" ? "Stop" : "Send"}
            >
              <Button
                size="sm"
                className="size-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors duration-200"
                disabled={!value || isSubmitting}
                type="button"
                onClick={handleMainClick}
                aria-label={status === "streaming" ? "Stop" : "Send message"}
              >
                {status === "streaming" ? (
                  <Stop className="size-5" />
                ) : (
                  <ArrowUp className="size-5" />
                )}
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  )
}