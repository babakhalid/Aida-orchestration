// /lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Globe, Book, YoutubeIcon, TelescopeIcon, GraduationCap, Microscope, Briefcase, Factory } from 'lucide-react';
import { ChatsCircle, Code, Memory, XLogo } from '@phosphor-icons/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`;
}

export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('mem0_user_id');
  if (!userId) {
    userId = generateId('user');
    localStorage.setItem('mem0_user_id', userId);
  }
  return userId;
}

export type SearchGroupId = 'web' | 'academic' | 'youtube' | 'x' | 'analysis' | 'chat' | 'extreme' | 'buddy' | 'education' | 'research' | 'entrepreneurship' | 'operations';

export const searchGroups = [
  {
    id: 'web' as const,
    name: 'Web',
    description: 'Search across the entire internet',
    icon: Globe,
    show: true,
  },
 
  {
    id: 'education' as const,
    name: 'Education',
    description: 'Explore educational resources and learning materials',
    icon: GraduationCap,
    show: true,
  },
  {
    id: 'research' as const,
    name: 'Research',
    description: 'Dive into research papers and studies',
    icon: Microscope,
    show: true,
  },
  {
    id: 'entrepreneurship' as const,
    name: 'Entrepreneurship',
    description: 'Resources for startups and business innovation',
    icon: Briefcase,
    show: true,
  },
  {
    id: 'operations' as const,
    name: 'Operations',
    description: 'Tools and insights for business operations',
    icon: Factory,
    show: true,
  },
  {
    id: 'extreme' as const,
    name: 'Extreme',
    description: 'Deep research with multiple sources and analysis',
    icon: TelescopeIcon,
    show: false,
  },
] as const;

export type SearchGroup = typeof searchGroups[number];