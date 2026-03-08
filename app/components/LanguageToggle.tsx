'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <button
                onClick={() => setLanguage('id')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-medium ${language === 'id'
                        ? 'bg-gradient-to-r from-[#00f5ff] to-[#8b5cf6] text-white shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                        : 'text-white/50 hover:text-white'
                    }`}
                aria-label="Bahasa Indonesia"
            >
                ID
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-medium ${language === 'en'
                        ? 'bg-gradient-to-r from-[#00f5ff] to-[#8b5cf6] text-white shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                        : 'text-white/50 hover:text-white'
                    }`}
                aria-label="English"
            >
                EN
            </button>
        </div>
    );
}
