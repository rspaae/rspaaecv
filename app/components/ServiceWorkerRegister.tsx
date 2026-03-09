'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegister() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('✅ SW registered:', registration.scope);

                    // Check for waiting worker
                    if (registration.waiting) {
                        setWaitingWorker(registration.waiting);
                        setUpdateAvailable(true);
                    }

                    // Listen for new workers installing
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    setWaitingWorker(newWorker);
                                    setUpdateAvailable(true);
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.log('❌ SW registration failed:', error);
                });

            // Listen for controlling worker change
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        }
    }, []);

    const updateServiceWorker = () => {
        if (waitingWorker) {
            waitingWorker.postMessage('SKIP_WAITING');
        }
    };

    if (!updateAvailable) return null;

    return (
        <div style={{ animation: 'slideUp 0.5s ease-out forwards' }} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] glass-card px-6 py-4 flex flex-col md:flex-row items-center gap-4 border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,245,255,0.15)] shadow-neon-cyan/20">
            <div className="flex items-center gap-3">
                <span className="text-xl animate-pulse">✨</span>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Update Available</span>
                    <span className="text-xs text-white/60">A new version of this portfolio is ready.</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setUpdateAvailable(false)}
                    className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors"
                >
                    Later
                </button>
                <button
                    onClick={updateServiceWorker}
                    className="px-4 py-1.5 text-xs font-bold bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 rounded-full hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                >
                    Refresh Now
                </button>
            </div>
        </div>
    );
}
