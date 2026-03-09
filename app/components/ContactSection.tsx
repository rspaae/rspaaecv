'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import TextScramble from './TextScramble';
import Toast from './Toast';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/rspaae',
        color: '#8b5cf6',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/inirspaa',
        color: '#ec4899',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/6281572836875',
        color: '#25D366',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
        ),
    },
];

export default function ContactSection() {
    const { t } = useLanguage();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCopyContact = () => {
        const phone = '081572836875';
        navigator.clipboard.writeText(phone).then(() => {
            setToast({ message: t('contact.copied') || 'Number copied to clipboard!', type: 'success' });
        }).catch(() => {
            setToast({ message: 'Failed to copy number.', type: 'error' });
        });
    };

    return (
        <section id="contact" className="relative py-24 md:py-32" style={{ zIndex: 2 }}>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <ScrollReveal>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-green))' }} />
                        <span className="text-sm font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--neon-green)' }}>
                            {t('contact.title')}
                        </span>
                        <div className="h-px w-[60px]" style={{ background: 'linear-gradient(90deg, var(--neon-green), transparent)' }} />
                    </div>
                    <h2
                        className="section-heading text-4xl md:text-6xl gradient-text mb-6"
                    >
                        <TextScramble text={t('contact.title')} as="span" scrambleSpeed={25} />
                    </h2>
                    <p className="text-base md:text-lg max-w-lg mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
                        {t('contact.subtitle')}
                    </p>
                </ScrollReveal>

                {/* CTA Button */}
                <ScrollReveal delay={200}>
                    <div className="mb-16 flex flex-col items-center gap-4">
                        <MagneticButton
                            onClick={() => window.open('https://wa.me/6281572836875', '_blank')}
                            className="!px-10 !py-4 !text-base !bg-gradient-to-r !from-neon-cyan/20 !to-neon-violet/20 !border-neon-violet/30"
                        >
                            <span className="gradient-text font-bold">{t('contact.send')} 👋</span>
                        </MagneticButton>
                        <button
                            onClick={handleCopyContact}
                            className="text-xs opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest cursor-pointer"
                        >
                            Click to copy: 081572836875
                        </button>
                    </div>
                </ScrollReveal>

                {/* Social Links with animated glow */}
                <ScrollReveal delay={400}>
                    <div className="flex items-center justify-center gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 interactive"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'var(--text-secondary)',
                                }}
                                title={link.name}
                            >
                                {/* Glow ring on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle, ${link.color}20 0%, transparent 70%)`,
                                        boxShadow: `0 0 25px ${link.color}30, inset 0 0 15px ${link.color}10`,
                                        border: `1px solid ${link.color}40`,
                                        borderRadius: 'inherit',
                                    }}
                                />
                                {/* Pulse ring animation */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                                    style={{
                                        border: `1px solid ${link.color}30`,
                                        borderRadius: 'inherit',
                                        animation: 'socialPulse 2s ease-in-out infinite',
                                    }}
                                />
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                                    {link.icon}
                                </span>
                            </a>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Footer */}
                <div className="mt-24 pt-8 flex flex-col items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/50 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></span>
                        Next.js PWA • v2.0
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} <span className="gradient-text font-medium">Rafa Ramdani</span>. Crafted with passion & code.
                    </p>
                </div>
            </div>
        </section>
    );
}
