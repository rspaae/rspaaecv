'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

type TranslationDictionary = {
    [key: string]: any;
};

export const translations: Record<Language, TranslationDictionary> = {
    id: {
        nav: {
            home: 'Beranda',
            about: 'Tentang',
            expertise: 'Keahlian',
            tech: 'Teknologi',
            projects: 'Proyek',
            contact: 'Kontak'
        },
        hero: {
            roles: ['Web Developer', 'Game Developer', 'Scripter', 'Bot Developer'],
            viewWork: 'Lihat Karya Saya',
            contact: 'Hubungi Saya',
            scroll: 'GULIR'
        },
        about: {
            title: 'Tentang Saya',
            subtitle: 'Siapa itu RSPAA?',
            highlight: 'Siswa SMKN 11 Bandung jurusan RPL / PPLG yang memiliki passion di bidang teknologi.',
            paragraph1: 'Halo! Perkenalkan, nama saya Rafa Ramdani. Saya adalah seorang siswa di SMKN 11 Bandung jurusan Rekayasa Perangkat Lunak (RPL) / Pengembangan Perangkat Lunak dan Gim (PPLG). Bagi saya, ngoding itu bukan sekadar ngetik baris perintah, tapi gimana merangkai logika dan kreativitas untuk membuat sesuatu yang keren.',
            paragraph2: 'Saya selalu antusias buat bikin hal-hal baru, mulai dari merancang website yang modern dan interaktif, nge-build bot pintar yang ngebantu banyak orang, sampai ngembangin game 2D dan 3D. Saya harap dari karya-karya yang saya buat, bisa ngasih pengalaman digital yang asik buat penggunanya!',
            experience: 'Tahun Pengalaman',
            projects: 'Proyek Selesai',
            clients: 'Klien Puas',
            awards: 'Penghargaan',
            profile: {
                name: 'Nama',
                age: 'Umur',
                ageValue: '16 Tahun',
                school: 'Sekolah',
                schoolValue: 'SMKN 11 Bandung',
                email: 'Email',
                ig: 'Instagram'
            }
        },
        expertise: {
            title: 'Keahlian Saya',
            subtitle: 'Bidang Fokus Utama',
            webDevSubtitle: 'Aplikasi Web Modern',
            webDevDesc: 'Membangun frontend dan backend performa tinggi.',
            gameDevSubtitle: 'Pengembangan Game',
            gameDevDesc: 'Membuat game 2D & 3D interaktif.',
            scripterSubtitle: 'Otomatisasi & Scripting',
            scripterDesc: 'Menulis script efisien untuk berbagai alur kerja.',
            botDevSubtitle: 'Pembuatan Bot',
            botDevDesc: 'Mengembangkan bot Discord dan Telegram kustom.',
        },
        tech: {
            title: 'Tech Stack',
            subtitle: 'Alat & Bahasa yang Saya Gunakan',
            hover: 'Arahkan kursor ke ikon untuk melihat detail'
        },
        projects: {
            title: 'Karya Pilihan',
            subtitle: 'Proyek Terbaru Saya',
            viewProject: 'Lihat Proyek',
            sourceCode: 'Kode Sumber',
            allProjects: 'Lihat Semua Proyek',
            drag: 'geser',
        },
        contact: {
            title: 'Mari Terhubung',
            subtitle: 'Punya ide proyek? Mari kita wujudkan bersama.',
            name: 'Nama',
            email: 'Email',
            message: 'Pesan',
            send: 'Kirim Pesan',
            sending: 'Mengirim...',
            location: 'Lokasi',
            locationText: 'Indonesia',
            socials: 'Sosial Media'
        },
        marquee: ['PIKIRKAN', 'DESAIN', 'BANGUN', 'KIRIM', 'ULANGI']
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            expertise: 'Expertise',
            tech: 'Tech',
            projects: 'Projects',
            contact: 'Contact'
        },
        hero: {
            roles: ['Web Developer', 'Game Developer', 'Scripter', 'Bot Developer'],
            viewWork: 'View My Work',
            contact: 'Contact Me',
            scroll: 'SCROLL'
        },
        about: {
            title: 'About Me',
            subtitle: 'Who is RSPAA?',
            highlight: 'A student at SMKN 11 Bandung majoring in Software Engineering / Game Development.',
            paragraph1: 'Hello! Let me introduce myself, my name is Rafa Ramdani. I am currently a student at SMKN 11 Bandung, majoring in Software Engineering (RPL) / Game Development (PPLG). For me, coding is never just about typing command lines, but weaving logic with creativity to build something cool.',
            paragraph2: 'I love exploring and building new things—from crafting modern and interactive websites, designing smart bots that help streamline tasks, to developing engaging 2D and 3D games. I always strive to pour my wild ideas into digital creations that bring positive and fun experiences to users!',
            experience: 'Years Experience',
            projects: 'Projects Completed',
            clients: 'Happy Clients',
            awards: 'Awards Won',
            profile: {
                name: 'Name',
                age: 'Age',
                ageValue: '16 Years Old',
                school: 'School',
                schoolValue: 'SMKN 11 Bandung',
                email: 'Email',
                ig: 'Instagram'
            }
        },
        expertise: {
            title: 'My Expertise',
            subtitle: 'Core Focus Areas',
            webDevSubtitle: 'Modern Web Apps',
            webDevDesc: 'Building high-performance frontends and backends.',
            gameDevSubtitle: 'Game Development',
            gameDevDesc: 'Crafting interactive 2D & 3D games.',
            scripterSubtitle: 'Automation & Scripting',
            scripterDesc: 'Writing efficient scripts for various workflows.',
            botDevSubtitle: 'Bot Creation',
            botDevDesc: 'Developing custom Discord and Telegram bots.',
        },
        tech: {
            title: 'Tech Stack',
            subtitle: 'Tools & Languages I Use',
            hover: 'Hover over icons to view details'
        },
        projects: {
            title: 'Selected Works',
            subtitle: 'My Recent Projects',
            viewProject: 'View Project',
            sourceCode: 'Source Code',
            allProjects: 'View All Projects',
            drag: 'drag',
        },
        contact: {
            title: 'Lets Connect',
            subtitle: 'Have a project in mind? Lets build something together.',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message',
            sending: 'Sending...',
            location: 'Location',
            locationText: 'Indonesia',
            socials: 'Socials'
        },
        marquee: ['THINK', 'DESIGN', 'BUILD', 'SHIP', 'REPEAT']
    }
};

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (keyPath: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('id');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved language or default to 'id'
        const saved = localStorage.getItem('site-language') as Language;
        if (saved && (saved === 'id' || saved === 'en')) {
            setLanguageState(saved);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('site-language', lang);
    };

    const t = (keyPath: string) => {
        const keys = keyPath.split('.');
        let current: any = translations[language];
        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                console.warn(`Translation key not found: ${keyPath}`);
                return keyPath;
            }
        }
        return current;
    };

    if (!mounted) {
        // Prevent hydration mismatch by rendering a stable layout first
        return (
            <LanguageContext.Provider value={{ language: 'id', setLanguage, t }}>
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
