import { Attachment as AIAttachment } from "@ai-sdk/ui-utils";

export interface Attachment {
    name: string;
    contentType: string;
    url: string;
    size: number;
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
  
  export interface Attachment extends AIAttachment {
    size: number;
  }