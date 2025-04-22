"use client"

import { HistoryTrigger } from "@/components/history/history-trigger"
import { AppInfoTrigger } from "@/components/layout/app-info/app-info-trigger"
import { ButtonNewChat } from "@/components/layout/button-new-chat"
import { UserMenu } from "@/components/layout/user-menu"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useChatSession } from "@/providers/chat-session-provider"
import { useUser } from "@/providers/user-provider"
import type { Agent } from "@/app/types/agent"
import { Button } from "@/components/ui/button"
import { useChats } from "@/lib/chat-store/chats/provider"
import { createClient } from "@/lib/supabase/client"
import { Info, Moon, Sun } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AgentLink } from "./agent-link"
import { HeaderAgent } from "./header-agent"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn, searchGroups, SearchGroupId } from "@/lib/utils"

type AgentHeader = Pick<Agent, "name" | "description" | "avatar_url">

export function Header({ selectedGroup }: { selectedGroup: SearchGroupId }) {
  const pathname = usePathname()
  const isMobile = useBreakpoint(768)
  const { user } = useUser()
  const { getChatById } = useChats()
  const { chatId } = useChatSession()
  const currentChat = chatId ? getChatById(chatId) : null
  const [agent, setAgent] = useState<AgentHeader | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const selectedGroupData = searchGroups.find(group => group.id === selectedGroup) || { name: "Web", icon: null }
  const selectedGroupLabel = selectedGroupData.name
  const SelectedGroupIcon = selectedGroupData.icon

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    setAgent(null)
  }, [pathname])

  useEffect(() => {
    if (!currentChat?.agent_id) return

    const supabase = createClient()

    const fetchAgent = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("name, description, avatar_url")
        .eq("id", currentChat?.agent_id || "")
        .single()

      if (error || !data) {
        console.error("Error fetching agent:", error)
        return
      }

      setAgent(data)
    }
    fetchAgent()
  }, [currentChat?.agent_id, pathname])

  const isLoggedIn = !!user

  return (
    <TooltipProvider delayDuration={100}>
      <header className="h-app-header fixed top-0 right-0 left-0 z-50 mt-4">
        <div className="h-app-header top-app-header bg-background pointer-events-none absolute left-0 z-50 mx-auto w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] lg:hidden"></div>

        <div className="bg-background relative mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:bg-transparent lg:px-8">
          <div className="flex items-center gap-3 flex-1">
            <Link href="/" className="inline-block">
              <img
                src="/logo_aida.svg"
                alt="AIDA Logo"
                className="h-8 w-auto"
              />
            </Link>
            <span className={cn(
              "flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors duration-200",
              isMobile && "gap-0.5 px-2 py-0.5 text-[10px]"
            )}>
              {SelectedGroupIcon && (
                <SelectedGroupIcon className={cn(
                  "size-3 text-neutral-600 dark:text-neutral-400",
                  isMobile && "size-2.5"
                )} />
              )}
              {selectedGroupLabel}
            </span>
          </div>
          {agent && (
            <HeaderAgent
              avatarUrl={agent?.avatar_url || ""}
              name={agent?.name || "Tiny Essay"}
              info={agent?.description || ""}
            />
          )}
          {!isLoggedIn ? (
            <div className="flex flex-1 items-center justify-end gap-4">
              <AppInfoTrigger
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                    aria-label="About AIDA"
                  >
                    <Info className="size-4" />
                  </Button>
                }
              />
              <AgentLink />
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
              <Link
                href="/auth"
                className="font-base text-muted-foreground hover:text-foreground text-base transition-colors"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-end gap-4">
              <ButtonNewChat />
              <AgentLink />
              <HistoryTrigger />
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
              <UserMenu />
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  )
}