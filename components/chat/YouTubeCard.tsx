// components/chat/YouTubeCard.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { YouTubeCardProps } from './types';
import { Play as PlayIcon, User2, YoutubeIcon } from 'lucide-react';

const YouTubeCard: React.FC<YouTubeCardProps> = ({ video, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!video) return null;

    const formatTimestamp = (timestamp: string) => {
        const match = timestamp.match(/(\d+:\d+(?::\d+)?) - (.+)/);
        if (match) {
            const [_, time, description] = match;
            return { time, description };
        }
        return { time: "", description: timestamp };
    };

    // Removed handleScrollableAreaEvents as it's not used

    return (
        <div
            className="w-[280px] flex-shrink-0 rounded-xl border dark:border-neutral-800 border-neutral-200 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300"
            onTouchStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <Link
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video block bg-neutral-100 dark:bg-neutral-800 overflow-hidden"
                aria-label={`Watch ${video.details?.title || 'YouTube video'}`}
            >
                {video.details?.thumbnail_url ? (
                    <img
                        src={video.details.thumbnail_url}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <YoutubeIcon className="h-8 w-8 text-red-500" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium line-clamp-2">
                        {video.details?.title || 'YouTube Video'}
                    </div>
                    <div className="rounded-full bg-white/90 p-2">
                        <PlayIcon className="h-6 w-6 text-red-600" />
                    </div>
                </div>
            </Link>

            <div className="p-3 flex flex-col gap-2">
                <div>
                    <Link
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium line-clamp-2 hover:text-red-500 transition-colors dark:text-neutral-100"
                    >
                        {video.details?.title || 'YouTube Video'}
                    </Link>

                    {video.details?.author_name && (
                        <Link
                            href={video.details.author_url || video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 group mt-1.5 w-fit"
                            aria-label={`Channel: ${video.details.author_name}`}
                        >
                            <div className="h-5 w-5 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center flex-shrink-0">
                                <User2 className="h-3 w-3 text-red-500" />
                            </div>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 group-hover:text-red-500 transition-colors truncate">
                                {video.details.author_name}
                            </span>
                        </Link>
                    )}
                </div>

                {(video.timestamps && video.timestamps?.length > 0 || video.captions) && (
                    <div className="mt-1">
                        <Accordion type="single" collapsible onValueChange={(value) => setIsExpanded(!!value)}>
                            <AccordionItem value="details" className="border-none">
                                <AccordionTrigger className="py-1 hover:no-underline">
                                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400">
                                        {isExpanded ? 'Hide details' : 'Show details'}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {video.timestamps && video.timestamps.length > 0 && (
                                        <div className="mt-2 space-y-1.5">
                                            <h4 className="text-xs font-semibold dark:text-neutral-300 text-neutral-700">Key Moments</h4>
                                            <ScrollArea className="h-[120px]">
                                                <div className="pr-4">
                                                    {video.timestamps.map((timestamp, i) => {
                                                        const { time, description } = formatTimestamp(timestamp);
                                                        return (
                                                            <Link
                                                                key={i}
                                                                href={`${video.url}&t=${time.split(':').reduce((acc, timePart, idx, arr) => {
                                                                    const timeNum = parseInt(timePart);
                                                                    if (arr.length === 2) { // MM:SS
                                                                        return idx === 0 ? acc + timeNum * 60 : acc + timeNum;
                                                                    } else { // HH:MM:SS
                                                                        return idx === 0 ? acc + timeNum * 3600 :
                                                                            idx === 1 ? acc + timeNum * 60 :
                                                                                acc + timeNum;
                                                                    }
                                                                }, 0)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-start gap-2 py-1 px-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                            >
                                                                <span className="text-xs font-medium text-red-500 whitespace-nowrap">{time}</span>
                                                                <span className="text-xs text-neutral-700 dark:text-neutral-300 line-clamp-1">{description}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    )}

                                    {video.captions && (
                                        <div className="mt-3 space-y-1.5">
                                            <h4 className="text-xs font-semibold dark:text-neutral-300 text-neutral-700">Transcript</h4>
                                            <ScrollArea className="h-[120px]">
                                                <div className="text-xs dark:text-neutral-400 text-neutral-600 rounded bg-neutral-50 dark:bg-neutral-800 p-2">
                                                    <p className="whitespace-pre-wrap">
                                                        {video.captions}
                                                    </p>
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
};

export const MemoizedYouTubeCard = React.memo(YouTubeCard, (prevProps, nextProps) => {
    // Basic shallow comparison, refine if needed based on video object structure changes
    return (
        prevProps.video.videoId === nextProps.video.videoId &&
        prevProps.index === nextProps.index &&
        prevProps.video.url === nextProps.video.url &&
        JSON.stringify(prevProps.video.details) === JSON.stringify(nextProps.video.details) &&
        prevProps.video.captions === nextProps.video.captions &&
        JSON.stringify(prevProps.video.timestamps) === JSON.stringify(nextProps.video.timestamps)
    );
});

MemoizedYouTubeCard.displayName = 'MemoizedYouTubeCard';

export default YouTubeCard;