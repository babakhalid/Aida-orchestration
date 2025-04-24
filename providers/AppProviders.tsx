// /providers/AppProviders.tsx
'use client';

import { ReactNode } from 'react';
import { MessagesProvider } from '@/lib/chat-store/messages/provider';
import { ChatSessionProvider } from '@/providers/chat-session-provider';
import { ChatsProvider } from '@/lib/chat-store/chats/provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ChatSessionProvider>
      <ChatsProvider>
        <MessagesProvider>
          {children}
        </MessagesProvider>
      </ChatsProvider>
    </ChatSessionProvider>
  );
}