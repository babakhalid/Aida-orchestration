"use client"

import { SearchGroupId } from "@/lib/utils"
import { Header } from "@/components/layout/header"

interface LayoutAppProps {
  children: React.ReactNode
}

export default function LayoutApp({ children }: LayoutAppProps) {
  const defaultGroup: SearchGroupId = "web" // Default group ID

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 @container/mainview relative flex h-full w-full">
      <main className="@container relative h-dvh w-0 flex-shrink flex-grow">
        <Header selectedGroup={defaultGroup} />
        {children}
      </main>
    </div>
  )
}