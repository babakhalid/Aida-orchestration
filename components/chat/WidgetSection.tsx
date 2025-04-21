// components/chat/WidgetSection.tsx
"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Clock as PhosphorClock, CalendarBlank } from '@phosphor-icons/react';

interface WidgetSectionProps {
    append: (message: { content: string; role: 'user' }) => Promise<string | null | undefined>;
    lastSubmittedQueryRef: React.MutableRefObject<string>;
    setHasSubmitted: (value: boolean) => void;
    status: string;
}

const WidgetSection: React.FC<WidgetSectionProps> = memo(({ append, lastSubmittedQueryRef, setHasSubmitted, status }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const now = new Date();
        const delay = 1000 - now.getMilliseconds(); // Align with the start of the next second
        const timeout = setTimeout(() => {
            setCurrentTime(new Date()); // Initial update
            timerRef.current = setInterval(() => {
                setCurrentTime(new Date()); // Subsequent updates every second
            }, 1000);
        }, delay);

        // Cleanup function
        return () => {
            clearTimeout(timeout);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

    const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: timezone
    }), [timezone]);

    const timeFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone
    }), [timezone]);

    const formattedDate = useMemo(() => dateFormatter.format(currentTime), [currentTime, dateFormatter]);
    const formattedTime = useMemo(() => timeFormatter.format(currentTime), [currentTime, timeFormatter]);

    const handleDateTimeClick = useCallback(() => {
        if (status !== 'ready') return;
        const query = `What's the current date and time?`;
        append({
            content: query,
            role: 'user'
        });
        lastSubmittedQueryRef.current = query;
        setHasSubmitted(true);
    }, [status, append, lastSubmittedQueryRef, setHasSubmitted]);

    return (
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button
                variant="outline"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                onClick={handleDateTimeClick}
                aria-label={`Ask for current time: ${formattedTime}`}
                disabled={status !== 'ready'}
            >
                <PhosphorClock weight="duotone" className="h-5 w-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{formattedTime}</span>
            </Button>
            <Button
                variant="outline"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                onClick={handleDateTimeClick}
                aria-label={`Ask for current date: ${formattedDate}`}
                disabled={status !== 'ready'}
            >
                <CalendarBlank weight="duotone" className="h-5 w-5 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{formattedDate}</span>
            </Button>
        </div>
    );
});

WidgetSection.displayName = 'WidgetSection';

export default WidgetSection;