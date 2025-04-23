import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ChatsProvider } from "@/lib/chat-store/chats/provider"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/config"
import { ThemeProvider } from "next-themes"
import Script from "next/script"
import { createClient } from "../lib/supabase/server"
import { LayoutClient } from "./layout-client"
import { ChatSessionProvider } from "@/providers/chat-session-provider"
import { UserProvider } from "@/providers/user-provider"
import { UserProfile } from "./types/user"
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDev = process.env.NODE_ENV === "development"
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  let userProfile = null
  if (data.user) {
    const { data: userProfileData } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user?.id)
      .single()

    userProfile = {
      ...userProfileData,
      profile_image: data.user?.user_metadata.avatar_url,
      display_name: data.user?.user_metadata.name,
    } as UserProfile
  }

  return (
    <html lang="en" suppressHydrationWarning>
      {!isDev ? (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="734ab99e-fc92-4879-b6cd-af7562cd50c3"
        />
      ) : null}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutClient />
        <NuqsAdapter>
        <UserProvider initialUser={userProfile}>
          <ChatsProvider userId={userProfile?.id}>
            <ChatSessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position="top-center" />
                {children}
              </ThemeProvider>
            </ChatSessionProvider>
          </ChatsProvider>
        </UserProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
