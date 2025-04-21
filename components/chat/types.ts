import { LucideIcon } from "lucide-react";
import { ToolInvocation } from "ai";
import { ReasoningUIPart, ToolInvocationUIPart, TextUIPart, SourceUIPart, FileUIPart, StepStartUIPart } from "@ai-sdk/ui-utils";
import { Message } from "@ai-sdk/react";
import { Dispatch, SetStateAction, RefObject, MutableRefObject } from 'react'; // Import 

export interface Attachment {
    name: string;
    contentType: string;
    url: string;
    size?: number; // Make size optional based on the error message
  }
  
  // Add other shared types here...
  export interface ReasoningTiming {
    startTime: number;
    endTime?: number;
  }
export interface XResult {
  id: string;
  url: string;
  title: string;
  author?: string;
  publishedDate?: string;
  text: string;
  highlights?: string[];
  tweetId: string;
}

export interface AcademicResult {
  title: string;
  url: string;
  author?: string | null;
  publishedDate?: string;
  summary: string;
}

export interface SearchLoadingStateProps {
  icon: LucideIcon;
  text: string;
  color: "red" | "green" | "orange" | "violet" | "gray" | "blue";
}

export interface VideoDetails {
  title?: string;
  author_name?: string;
  author_url?: string;
  thumbnail_url?: string;
  type?: string;
  provider_name?: string;
  provider_url?: string;
  height?: number;
  width?: number;
}

export interface VideoResult {
  videoId: string;
  url: string;
  details?: VideoDetails;
  captions?: string;
  timestamps?: string[];
  views?: string;
  likes?: string;
  summary?: string;
}

export interface YouTubeSearchResponse {
  results: VideoResult[];
}

export interface YouTubeCardProps {
  video: VideoResult;
  index: number;
}

export interface CollapsibleSectionProps {
  code: string;
  output?: string;
  language?: string;
  title?: string;
  icon?: string;
  status?: "running" | "completed";
}

export interface MarkdownRendererProps {
  content: string;
}

export interface CitationLink {
  text: string;
  link: string;
}

export interface ToolInvocationListViewProps {
  toolInvocations: ToolInvocation[];
  message: Message;
}

export interface TranslationToolProps {
  toolInvocation: ToolInvocation;
  result: any; // Consider defining a more specific result type
}

export interface AttachmentsBadgeProps {
  attachments: Attachment[];
}

export interface ChatMessageProps {
    message: Message; // Or ExtendedMessage from lib/types if needed
    index: number;
    memoizedMessages: Message[]; // Or ExtendedMessage[]
    isLastMessage: boolean;
    isEditingMessage: boolean;
    editingMessageIndex: number;
    input: string;
    setInput: (value: string) => void; // Correct signature
    status: "idle" | "loading" | "streaming" | "error" | "submitted" | "ready"; // UseChatStatus enum if available
    lastUserMessageIndex: number;
    handleMessageEdit: (index: number) => void;
    handleMessageUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
    handleRegenerate: () => void;
    suggestedQuestions: string[];
    handleSuggestedQuestionClick: (question: string) => void;
    reasoningVisibilityMap: Record<string, boolean>;
    setReasoningVisibilityMap: Dispatch<SetStateAction<Record<string, boolean>>>;
    reasoningTimings: Record<string, ReasoningTiming>; // Use imported ReasoningTiming
    setReasoningTimings: Dispatch<SetStateAction<Record<string, ReasoningTiming>>>;
    setIsEditingMessage: (value: boolean) => void;
    setEditingMessageIndex: (index: number) => void;
  }
  
  export interface ChatFormProps {
    input: string;
    setInput: (value: string) => void; // Correct signature
    attachments: Attachment[]; // Use imported Attachment
    setAttachments: Dispatch<SetStateAction<Attachment[]>>; // Use imported Attachment
    handleSubmit: (
      event?: React.FormEvent<HTMLFormElement>, // Use React's event type
      // Use ChatRequestOptions if available from @ai-sdk/react or ui-utils
      // OR define inline based on expected structure from useChat
      chatRequestOptions?: { data?: any; experimental_attachments?: Attachment[] }
    ) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    inputRef: RefObject<HTMLTextAreaElement>;
    stop: () => void;
    messages: Message[]; // Base Message type from useChat
    append: (
      message: Message | { content: string; role: "user" },
      // Use ChatRequestOptions if available from @ai-sdk/react or ui-utils
      options?: { data?: any; experimental_attachments?: Attachment[] }
    ) => Promise<string | null | undefined>;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    resetSuggestedQuestions: () => void;
    lastSubmittedQueryRef: MutableRefObject<string>;
    selectedGroup: SearchGroupId; // Use imported SearchGroupId
    setSelectedGroup: Dispatch<SetStateAction<SearchGroupId>>; // Use imported SearchGroupId
    showExperimentalModels: boolean;
    status: "idle" | "loading" | "streaming" | "error" | "submitted" | "ready"; // UseChatStatus enum if available
    setHasSubmitted: Dispatch<SetStateAction<boolean>>;
  }

export interface ReasoningTiming {
  startTime: number;
  endTime?: number;
}

export type SearchGroupId = "web" | "extreme";

export type MessagePart = TextUIPart | ReasoningUIPart | ToolInvocationUIPart | SourceUIPart | FileUIPart | StepStartUIPart;