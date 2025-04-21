// components/chat/TranslationTool.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Wave } from "@foobar404/wave";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Pause, Play as PlayIcon } from 'lucide-react';
import { generateSpeech } from '@/app/actions'; // Adjust path if needed
import { TranslationToolProps } from './types';

const TranslationTool: React.FC<TranslationToolProps> = ({ toolInvocation, result }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const waveRef = useRef<Wave | null>(null);

    useEffect(() => {
        const _audioRef = audioRef.current;
        return () => {
            if (_audioRef) {
                _audioRef.pause();
                _audioRef.src = '';
            }
            waveRef.current = null; // Clean up Wave instance
        };
    }, []);

    useEffect(() => {
        if (audioUrl && audioRef.current && canvasRef.current && !waveRef.current) {
            try {
                 // Ensure Wave is only initialized once per audioUrl
                waveRef.current = new Wave(audioRef.current, canvasRef.current);
                waveRef.current.addAnimation(new waveRef.current.animations.Lines({
                    lineWidth: 1.5,
                    lineColor: 'rgb(147, 51, 234)', // Tailwind purple-600 approx
                    count: 80,
                    mirroredY: true,
                }));
            } catch (error) {
                console.error("Error initializing Wave:", error);
            }
        }
        // Cleanup previous Wave instance if audioUrl changes or component unmounts
        return () => {
            if (waveRef.current) {
                waveRef.current = null;
                waveRef.current = null;
            }
        };
    }, [audioUrl]); // Re-run effect only when audioUrl changes

    const handlePlayPause = async () => {
        if (!result?.translatedText) return; // Don't proceed if no text

        if (!audioUrl && !isGeneratingAudio) {
            setIsGeneratingAudio(true);
            try {
                const { audio } = await generateSpeech(result.translatedText);
                setAudioUrl(audio); // This will trigger the useEffect above
                setIsGeneratingAudio(false);
                // Use setTimeout to ensure audio element is ready after state update
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
                        setIsPlaying(true);
                    }
                }, 100);
            } catch (error) {
                console.error("Error generating speech:", error);
                setIsGeneratingAudio(false);
            }
        } else if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    if (!result) {
        return (
            <Card className="w-full my-4 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-sm">
                <CardContent className="flex items-center justify-center h-24">
                    <div className="animate-pulse flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">Translating...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full my-4 shadow-none bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
            <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            The phrase <span className="font-medium text-neutral-900 dark:text-neutral-100">{toolInvocation.args.text}</span> translates from <span className="font-medium text-neutral-900 dark:text-neutral-100">{result.detectedLanguage}</span> to <span className="font-medium text-neutral-900 dark:text-neutral-100">{toolInvocation.args.to}</span> as <span className="font-medium text-primary">{result.translatedText}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                            onClick={handlePlayPause}
                            disabled={isGeneratingAudio || !result.translatedText}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex-shrink-0"
                            aria-label={isPlaying ? "Pause audio" : "Play audio"}
                        >
                            {isGeneratingAudio ? (
                                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                                <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                        </Button>
                        <div className="flex-1 h-8 sm:h-10 bg-neutral-100 dark:bg-neutral-900 rounded-md sm:rounded-lg overflow-hidden">
                            <canvas
                                ref={canvasRef}
                                width="800" // Intrinsic width for canvas resolution
                                height="200" // Intrinsic height for canvas resolution
                                className="w-full h-full opacity-90 dark:opacity-70" // CSS dimensions
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={handleReset} // Use handleReset onEnded
                    preload="metadata" // Preload metadata for better UX
                />
            )}
        </Card>
    );
};

export default TranslationTool;