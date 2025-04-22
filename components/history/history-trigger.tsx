"use client"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useChatSession } from "@/providers/chat-session-provider"
import { useChats } from "@/lib/chat-store/chats/provider"
// Removed: import { useMessages } from "@/lib/chat-store/messages/provider" // No longer needed here
import { ListMagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CommandHistory } from "./command-history"
import { DrawerHistory } from "./drawer-history"

export function HistoryTrigger() {
  const isMobile = useBreakpoint(768)
  const router = useRouter()
  const { chats, updateTitle, deleteChat } = useChats()
  // Removed: const { deleteMessages } = useMessages() // No longer needed here
  const [isOpen, setIsOpen] = useState(false)
  const { chatId } = useChatSession() // Get current active chat ID

  const handleSaveEdit = async (id: string, newTitle: string) => {
    await updateTitle(id, newTitle)
  }

  const handleConfirmDelete = async (id: string) => {
    // Determine if the chat being deleted IS the currently active chat
    const isDeletingCurrentChat = id === chatId;

    if (isDeletingCurrentChat) {
      setIsOpen(false); // Close the history panel if deleting the current chat
    }

    // Delete the chat entry using the ChatsProvider function
    await deleteChat(id, chatId ?? undefined, () => {
        // This redirect function is passed to deleteChat
        // It will be called *after* the chat is deleted from the DB/cache
        // Navigating away should cause the main chat component (page.tsx)
        // to unmount or its useChat hook to reset, clearing the old messages.
        router.push("/");
    });

    // Removed: await deleteMessages()
    // Deleting active messages should be handled implicitly by the chat component
    // resetting when the chatId changes or the user navigates away.
  }


  const trigger = (
    <button
      className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1.5 transition-colors"
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label="View Chat History" // Added aria-label for accessibility
    >
      <ListMagnifyingGlass size={24} />
    </button>
  )

  if (isMobile) {
    return (
      <DrawerHistory
        chatHistory={chats}
        onSaveEdit={handleSaveEdit}
        onConfirmDelete={handleConfirmDelete}
        trigger={trigger}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    )
  }

  return (
    <CommandHistory
      chatHistory={chats}
      onSaveEdit={handleSaveEdit}
      onConfirmDelete={handleConfirmDelete}
      trigger={trigger}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  )
}