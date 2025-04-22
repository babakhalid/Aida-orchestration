"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signInWithGoogle } from "@/lib/api"
import { APP_NAME } from "@/lib/config"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useState } from "react"
import { HeaderGoBack } from "@/components/header-go-back"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      setError(null)

      const data = await signInWithGoogle(supabase)

      if (data?.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      console.error("Error signing in with Google:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 font-sans">
      <HeaderGoBack href="/" />
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <Card className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl">
          <CardHeader className="space-y-2 px-6 pt-8 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-center text-neutral-900 dark:text-neutral-100">
              Welcome to {APP_NAME}
            </CardTitle>
            <CardDescription className="text-center text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
              Sign in with your Google account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-6 space-y-4">
            {error && (
              <Alert variant="destructive" className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <AlertDescription className="text-neutral-900 dark:text-neutral-100">{error}</AlertDescription>
              </Alert>
            )}
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 rounded-lg"
              onClick={handleSignInWithGoogle}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2 size-5"
                  />
                  Continue with Google
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="px-6 pb-8">
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 w-full">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}