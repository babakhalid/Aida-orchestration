"use client";

import { useUser } from "@/providers/user-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AppInfoTrigger } from "./app-info/app-info-trigger";
import { FeedbackTrigger } from "./feedback/feedback-trigger";
// Import the renamed component
import { SettingsMenuItem } from "./settings/settings-trigger"; // <-- Renamed import


export function UserMenu() {
  const { user } = useUser()

  if (!user) return null

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Add asChild here for consistency and proper prop merging */}
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer"> {/* Added cursor-pointer for better UX */}
              <AvatarImage src={user?.profile_image ?? undefined} />
              <AvatarFallback>{user?.display_name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Profile</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        // Prevent focus jump after closing dialog/drawer opened from item
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Make this non-interactive or use DropdownMenuLabel */}
        <div className="px-2 py-1.5 text-sm"> {/* Changed to div */}
          <div className="font-medium">{user?.display_name}</div>
          <div className="text-muted-foreground max-w-[calc(theme(width.56)-theme(spacing.4))] truncate text-xs"> {/* Adjusted width calculation */}
            {user?.email}
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* Use the renamed component */}
        <SettingsMenuItem /> {/* <-- Use the renamed component */}
        <FeedbackTrigger />
        <AppInfoTrigger />
         {/* Consider adding a Sign Out item here as well */}
         {/* Example:
         <DropdownMenuSeparator />
         <DropdownMenuItem onClick={handleSignOut}>
            <SignOut className="mr-2 size-4" />
            <span>Sign Out</span>
         </DropdownMenuItem>
         */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}