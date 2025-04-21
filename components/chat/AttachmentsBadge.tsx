// components/chat/AttachmentsBadge.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'sonner';
import { AttachmentsBadgeProps } from './types';

const AttachmentsBadge: React.FC<AttachmentsBadgeProps> = ({ attachments }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const imageAttachments = attachments.filter(att => att.contentType?.startsWith('image/'));

    if (imageAttachments.length === 0) return null;

    return (
        <>
            <div className="mt-2 flex flex-wrap gap-2">
                {imageAttachments.map((attachment, i) => {
                    const fileName = attachment.name || `Image ${i + 1}`;
                    const truncatedName = fileName.length > 15
                        ? fileName.substring(0, 12) + '...'
                        : fileName;

                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setSelectedIndex(i);
                                setIsOpen(true);
                            }}
                            className="flex items-center gap-1.5 max-w-xs rounded-full pl-1 pr-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <div className="h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                    src={attachment.url}
                                    alt={fileName}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
                                {truncatedName}
                            </span>
                        </button>
                    );
                })}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="p-0 bg-white dark:bg-neutral-900 sm:max-w-4xl">
                    <div className="flex flex-col h-full">
                        <header className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        navigator.clipboard.writeText(imageAttachments[selectedIndex].url);
                                        toast.success("Image URL copied to clipboard");
                                    }}
                                    className="h-8 w-8 rounded-md text-neutral-600 dark:text-neutral-400"
                                    title="Copy link"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <a
                                    href={imageAttachments[selectedIndex].url}
                                    download={imageAttachments[selectedIndex].name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                                    title="Download"
                                >
                                    {/* SVG for download icon */}
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                        <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5539 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1046 12.1059 14 11.0012 14H3.99635C2.89019 14 2 13.1046 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                                <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mr-8">
                                    {selectedIndex + 1} of {imageAttachments.length}
                                </Badge>
                            </div>
                            <div className="w-8"></div> {/* Spacer */}
                        </header>
                        <div className="flex-1 p-4 overflow-auto flex items-center justify-center">
                            <div className="relative max-w-full max-h-[60vh]">
                                <img
                                    src={imageAttachments[selectedIndex].url}
                                    alt={imageAttachments[selectedIndex].name || `Image ${selectedIndex + 1}`}
                                    className="max-w-full max-h-[60vh] object-contain rounded-md"
                                />
                                {imageAttachments.length > 1 && (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setSelectedIndex(prev => (prev === 0 ? imageAttachments.length - 1 : prev - 1))}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setSelectedIndex(prev => (prev === imageAttachments.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        {imageAttachments.length > 1 && (
                            <div className="border-t border-neutral-200 dark:border-neutral-800 p-3">
                                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                                    {imageAttachments.map((attachment, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedIndex(idx)}
                                            className={`relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0 transition-all ${selectedIndex === idx
                                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                                                : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={attachment.url}
                                                alt={attachment.name || `Thumbnail ${idx + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <footer className="border-t border-neutral-200 dark:border-neutral-800 p-3">
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                                <span className="truncate max-w-[80%]">
                                    {imageAttachments[selectedIndex].name || `Image ${selectedIndex + 1}`}
                                </span>
                                {imageAttachments[selectedIndex].size && (
                                    <span>
                                        {Math.round(imageAttachments[selectedIndex].size / 1024)} KB
                                    </span>
                                )}
                            </div>
                        </footer>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AttachmentsBadge;