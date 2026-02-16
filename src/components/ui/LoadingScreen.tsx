"use client";

import React from 'react';

interface LoadingScreenProps {
    message?: string;
    subMessage?: string;
    fullPage?: boolean;
}

const LoadingScreen = ({
    message = "SubSafe",
    subMessage = "Scanning Reddit compliance",
    fullPage = true
}: LoadingScreenProps) => {
    const containerClasses = fullPage
        ? "fixed inset-0 z-[9999]"
        : "absolute inset-0 z-[50] rounded-[24px]";

    return (
        <div className={`${containerClasses} flex flex-col items-center justify-center bg-brand-bg/95 backdrop-blur-sm select-none`}>
            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <div className="relative flex flex-col items-center scale-90 md:scale-100">
                {/* Main Logo/Icon Animation */}
                <div className="relative w-24 h-24 mb-8">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-brand-orange/20 animate-ping opacity-75" />
                    <div className="absolute inset-2 rounded-full border-4 border-brand-lime/20 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />

                    {/* The SubSafe Logo container */}
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-orange rounded-2xl shadow-[0_10px_30px_rgba(255,90,54,0.3)] transform -rotate-6 animate-float">
                        <span className="text-white font-display font-bold text-5xl">S</span>

                        {/* Subtle inner reflection for premium feel */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
                    </div>


                    {/* Orbiting dots */}
                    <div className="absolute -inset-6 border border-dashed border-brand-orange/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute -inset-6 flex items-center justify-center">
                        <div className="absolute -top-1.5 w-3 h-3 bg-brand-orange rounded-full shadow-[0_0_15px_rgba(255,90,54,0.6)]" />
                    </div>
                </div>

                {/* Text and progress */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-2xl font-bold text-brand-black mb-1 tracking-tight">
                        {message === "SubSafe" ? (
                            <>Sub<span className="text-brand-orange">Safe</span></>
                        ) : message}
                    </h2>
                    <div className="flex items-center gap-2 mb-6 min-h-5">
                        <p className="text-sm font-medium text-brand-black/60">{subMessage}</p>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1 h-1 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-48 h-1.5 bg-brand-gray rounded-full overflow-hidden border border-brand-gray/50 shadow-inner">
                        <div
                            className="h-full bg-linear-to-r from-brand-orange via-brand-lime to-brand-orange bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite] rounded-full"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
