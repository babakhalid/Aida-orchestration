"use client"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // We won't use this directly on the item
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  // DrawerTrigger, // We won't use this directly on the item
} from "@/components/ui/drawer"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Gear } from "@phosphor-icons/react" // Using Gear icon as an example
import type React from "react"
import { useState } from "react"
import { SettingsContent } from "./settings-content"

/**
 * Renders a DropdownMenuItem that, when selected, opens a
 * Dialog or Drawer containing the SettingsContent.
 * This component should be placed inside a DropdownMenuContent.
 */
export function SettingsMenuItem() { // Renamed for clarity
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const isMobile = useBreakpoint(768) // Assuming 768px is your md breakpoint

  const handleSelect = (event: Event) => {
    // Prevent the default behavior of the DropdownMenu closing
    // when we immediately open a Dialog.
    event.preventDefault()
    setIsSettingsOpen(true)
  }

  // The actual menu item
  const menuItem = (
    <DropdownMenuItem onSelect={handleSelect} className="cursor-pointer">
      {/* Using Gear icon, adjust as needed */}
      <Gear className="mr-2 size-4" />
      <span>Settings</span>
    </DropdownMenuItem>
  )

  // The modal/drawer part - Rendered conditionally based on state
  // It exists in the tree but is controlled by `isSettingsOpen`
  const settingsModal = isMobile ? (
    <Drawer open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      {/* Drawer doesn't need an explicit trigger here, it's controlled by state */}
      <DrawerContent>
        {/* Pass isDrawer and onClose handler */}
        <SettingsContent isDrawer onClose={() => setIsSettingsOpen(false)} />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      {/* Dialog doesn't need an explicit trigger here */}
      <DialogContent className="gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="border-border border-b px-6 py-4">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        {/* Pass onClose handler */}
        <SettingsContent onClose={() => setIsSettingsOpen(false)} />
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      {menuItem}
      {/* Render the Dialog/Drawer; its visibility is controlled by state */}
      {settingsModal}
    </>
  )
}

// How you would use it in your UserMenu component:
// import { SettingsMenuItem } from './SettingsMenuItem'; // Adjust path
//
// // ... inside UserMenu component
// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="ghost" size="icon">
//        <User className="h-5 w-5" />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="end">
//     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <SettingsMenuItem /> {/* Use the refactored component here */}
//     <DropdownMenuItem>
//       <LifeBuoy className="mr-2 size-4" />
//       <span>Support</span>
//     </DropdownMenuItem>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem onClick={() => handleSignOut()}> {/* Example sign out */}
//       <SignOut className="mr-2 size-4" />
//       <span>Sign out</span>
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>