'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);

    useEffect(() => {
        // Check if already installed or dismissed recently
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone);
        const hasDismissed = localStorage.getItem('pwa-prompt-dismissed');

        if (isStandalone) return;

        // If dismissed, check if 7 days have passed
        if (hasDismissed) {
            const dismissDate = new Date(hasDismissed).getTime();
            const now = new Date().getTime();
            if (now - dismissDate < 7 * 24 * 60 * 60 * 1000) {
                return;
            }
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent Chrome 67+ from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Show custom install UI
            setShowInstallBtn(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Detect successful install
        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null);
            setShowInstallBtn(false);
            console.log('PWA was installed');
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        await deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowInstallBtn(false);
    };

    const handleDismiss = () => {
        setShowInstallBtn(false);
        localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
    };

    if (!showInstallBtn) return null;

    return (
        <div style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} className="fixed bottom-4 md:bottom-6 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 z-[90] w-[calc(100%-2rem)] md:w-auto max-w-sm glass-card p-4 border border-neon-magenta/30 shadow-[0_8px_32px_rgba(255,0,229,0.15)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-magenta p-[1px] shrink-0">
                <div className="w-full h-full rounded-2xl bg-[#050510] flex items-center justify-center overflow-hidden">
                    <img src="/icons/icon-192.png" alt="App Icon" className="w-8 h-8 rounded-lg" />
                </div>
            </div>

            <div className="flex-1 flex flex-col pt-0.5">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-white mb-0.5 font-['Space_Grotesk']">Install App</span>
                    <button onClick={handleDismiss} className="text-white/40 hover:text-white transition-colors p-1 -mr-2 -mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <span className="text-xs text-white/60 mb-3 leading-tight">Add to your home screen for a faster, app-like experience.</span>

                <button
                    onClick={handleInstallClick}
                    className="self-start px-4 py-1.5 text-xs font-bold bg-white text-black rounded-full hover:bg-neon-magenta hover:text-white transition-all shadow-[0_4px_14px_rgba(255,0,229,0.2)]"
                >
                    Install
                </button>
            </div>
        </div>
    );
}
