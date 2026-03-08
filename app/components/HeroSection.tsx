'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import MagneticButton from './MagneticButton';
import TypingText from './TypingText';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
    const nameRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const name = 'Rafa Ramdani';
    const roles = t('hero.roles') as string[];

    useEffect(() => {
        // Staggered letter reveal — runs once on mount, not looping
        if (nameRef.current) {
            const letters = nameRef.current.querySelectorAll('.hero-letter');
            anime({
                targets: letters,
                translateY: [80, 0],
                rotateZ: () => anime.random(-15, 15),
                opacity: [0, 1],
                easing: 'easeOutElastic(1, .6)',
                duration: 1800,
                delay: anime.stagger(100, { start: 300 }),
            });
        }

        // Subtitle fade in — runs once
        if (subtitleRef.current) {
            anime({
                targets: subtitleRef.current,
                opacity: [0, 1],
                translateY: [30, 0],
                easing: 'easeOutCubic',
                duration: 1000,
                delay: 1200,
            });
        }

        // CTA button appear — runs once
        if (ctaRef.current) {
            anime({
                targets: ctaRef.current,
                opacity: [0, 1],
                translateY: [20, 0],
                easing: 'easeOutCubic',
                duration: 800,
                delay: 1600,
            });
        }
        // No SVG morphing — replaced with pure CSS animation below
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
            style={{ zIndex: 2 }}
        >
            {/* SVG Background — Pure CSS rotation, no anime.js */}
            <svg
                className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20"
                viewBox="0 0 400 400"
                style={{ zIndex: 0, animation: 'spin-slow 60s linear infinite' }}
            >
                <path
                    d="M100,200 C150,100 250,100 300,200 C350,300 250,350 200,300 C150,250 50,300 100,200"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1"
                    opacity="0.2"
                />
                <path
                    d="M150,150 C200,50 350,100 300,200 C250,300 350,350 250,300 C150,250 100,250 150,150"
                    fill="none"
                    stroke="url(#grad2)"
                    strokeWidth="0.8"
                    opacity="0.15"
                />
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f5ff" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff00e5" />
                        <stop offset="100%" stopColor="#00f5ff" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Name with staggered letter reveal */}
            <div ref={nameRef} className="relative z-10 flex items-center justify-center mb-6">
                {name.split('').map((letter, i) => (
                    <span
                        key={i}
                        className="hero-letter inline-block text-6xl sm:text-8xl md:text-9xl font-black tracking-tight opacity-0 gradient-text cursor-default hero-wave"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            animationDelay: `${i * 0.15}s`,
                        }}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </div>

            {/* Subtitle */}
            <div
                ref={subtitleRef}
                className="relative z-10 text-lg md:text-xl font-light tracking-widest uppercase opacity-0 mb-10 min-h-[1.5rem] md:min-h-[1.75rem] flex items-center justify-center"
                style={{ color: 'var(--text-secondary)' }}
            >
                <TypingText phrases={roles} typingSpeed={70} deletingSpeed={40} pauseDuration={1200} />
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="relative z-10 opacity-0 flex gap-4">
                <MagneticButton href="#projects" className="gradient-text-alt !text-white">
                    <span className="gradient-text">{t('hero.viewWork')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--neon-cyan)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </MagneticButton>
                <MagneticButton href="#contact">
                    <span>{t('hero.contact')}</span>
                </MagneticButton>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>{t('hero.scroll')}</span>
                <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                    <div
                        className="w-1 h-2 rounded-full"
                        style={{
                            background: 'var(--neon-cyan)',
                            animation: 'float 2s ease-in-out infinite',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
