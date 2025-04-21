"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Info, Plus } from "lucide-react"; // Added Plus import
// Assuming VercelIcon is defined elsewhere or remove if not needed
// import { VercelIcon } from "./VercelIcon";
import React from "react"; // Import React for VercelIcon definition

// Define VercelIcon here if it's simple and not imported
const VercelIcon = ({ size = 16 }: { size?: number }) => {
    return (
        <svg
            height={size}
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width={size}
            style={{ color: "currentcolor" }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1L16 15H0L8 1Z"
                fill="currentColor"
            ></path>
        </svg>
    );
};


// Define props interface including onNewChat
interface ChatNavbarProps {
    onNewChat: () => void; // Callback for starting a new chat
    // Add other props if needed (e.g., for chat history)
    // chatHistory?: any[];
    // activeChatId?: string | null;
    // onChatSelect?: (id: string) => void;
}

export const ChatNavbar: React.FC<ChatNavbarProps> = ({ onNewChat }) => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        // Reduced height slightly, adjusted padding
        <nav className="sticky top-0 left-0 right-0 z-30 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-2"> {/* Reduced gap */}
                        <Link href="/" className="flex items-center gap-1.5"> {/* Reduced gap */}
                            <Image
                                src="/scira.png"
                                alt="Scira AI"
                                width={28} // Slightly smaller
                                height={28}
                                className="invert dark:invert-0"
                                unoptimized
                            />
                            <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100 hidden sm:inline"> {/* Hide on small screens */}
                                Scira
                            </span>
                        </Link>
                        {/* Use the onNewChat prop */}
                        <Button
                            variant="outline"
                            // Slightly smaller button and text
                            className="h-8 px-3 rounded-md bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-xs"
                            aria-label="New chat"
                            onClick={onNewChat} // Attach the handler
                        >
                            <Plus className="h-3.5 w-3.5 mr-1.5" /> {/* Smaller icon */}
                            New Chat
                        </Button>
                    </div>
                    <div className="flex items-center gap-1"> {/* Reduced gap */}
                        {/* Deploy button kept */}
                        <Link
                            target="_blank"
                            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzaidmukaddam%2Fscira&env=XAI_API_KEY,OPENAI_API_KEY,GROQ_API_KEY,E2B_API_KEY,ELEVENLABS_API_KEY,TAVILY_API_KEY,EXA_API_KEY,TMDB_API_KEY,YT_ENDPOINT,FIRECRAWL_API_KEY,OPENWEATHER_API_KEY,SANDBOX_TEMPLATE_ID,GOOGLE_MAPS_API_KEY,MAPBOX_ACCESS_TOKEN,TRIPADVISOR_API_KEY,AVIATION_STACK_API_KEY,CRON_SECRET,BLOB_READ_WRITE_TOKEN,NEXT_PUBLIC_MAPBOX_TOKEN,NEXT_PUBLIC_POSTHOG_KEY,NEXT_PUBLIC_POSTHOG_HOST,NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,MEM0_API_KEY,MEM0_ORG_ID,MEM0_PROJECT_ID,SMITHERY_API_KEY&envDescription=API%20keys%20and%20configuration%20required%20for%20Scira%20to%20function%20(including%20SMITHERY_API_KEY)"
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all" // Adjusted padding/rounding
                        >
                            <VercelIcon size={14} /> {/* Smaller icon */}
                            <span className="text-xs hidden sm:inline">Deploy</span> {/* Smaller text */}
                        </Link>
                        {/* About Button */}
                        <Link href="/about" aria-label="About Scira">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full" // Smaller button
                            >
                                <Info className="h-4 w-4" /> {/* Smaller icon */}
                            </Button>
                        </Link>
                        {/* Theme Toggle Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="h-8 w-8 rounded-full" // Smaller button
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> {/* Smaller icon */}
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> {/* Smaller icon */}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Optional: Add display name
ChatNavbar.displayName = 'ChatNavbar';