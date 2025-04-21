// src/components/layout/header.tsx (or wherever your Header component is defined)

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
import { APP_NAME } from "@/lib/config"
import { createClient } from "@/lib/supabase/client"
import { Info } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AgentLink } from "./agent-link" // Assuming this path is correct
import { HeaderAgent } from "./header-agent" // Assuming this path is correct
import { TooltipProvider } from "@/components/ui/tooltip"; // <-- Import TooltipProvider

type AgentHeader = Pick<Agent, "name" | "description" | "avatar_url">

export function Header() {
  const pathname = usePathname()
  const isMobile = useBreakpoint(768)
  const { user } = useUser()
  const { getChatById } = useChats()
  const { chatId } = useChatSession()
  const currentChat = chatId ? getChatById(chatId) : null
  const [agent, setAgent] = useState<AgentHeader | null>(null)

  useEffect(() => {
    // reset agent when pathname changes
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
    // Wrap the header content with TooltipProvider
    <TooltipProvider delayDuration={100}> {/* You can adjust delayDuration if needed */}
      <header className="h-app-header fixed top-0 right-0 left-0 z-50">
        {/* This div is just for the gradient mask, doesn't need the provider */}
        <div className="h-app-header top-app-header bg-background pointer-events-none absolute left-0 z-50 mx-auto w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] lg:hidden"></div>

        {/* This div contains the actual interactive elements */}
        <div className="bg-background relative mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:bg-transparent lg:px-8">
          {Boolean(!agent || !isMobile) && (
            <div className="flex-1">
              <Link href="/" className="text-xl font-medium tracking-tight">
                {APP_NAME}
              </Link>
            </div>
          )}
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
                    aria-label={`About ${APP_NAME}`}
                  >
                    <Info className="size-4" />
                  </Button>
                }
              />
              <AgentLink /> {/* Uses Tooltip */}
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
              <AgentLink /> {/* Uses Tooltip */}
              <HistoryTrigger /> {/* Might use Tooltip */}
              <UserMenu /> {/* Might use Tooltip */}
            </div>
          )}
        </div>
      </header>
    </TooltipProvider> // Close TooltipProvider
  )
}