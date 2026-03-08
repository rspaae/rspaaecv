'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
    phrases: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

export default function TypingText({
    phrases,
    typingSpeed = 120, // Not too fast
    deletingSpeed = 60,
    pauseDuration = 2500, // Good pause to read
    className = ''
}: TypingTextProps) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingDelay, setTypingDelay] = useState(typingSpeed);

    useEffect(() => {
        let ticker = setTimeout(() => {
            handleType();
        }, typingDelay);

        return () => clearTimeout(ticker);
    }, [text, isDeleting, loopNum, typingDelay]);

    const handleType = () => {
        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        if (isDeleting) {
            setText(fullText.substring(0, text.length - 1));
            setTypingDelay(deletingSpeed);
        } else {
            setText(fullText.substring(0, text.length + 1));
            // Add a little randomness to typing speed for a more human feel
            setTypingDelay(typingSpeed - Math.random() * 30);
        }

        if (!isDeleting && text === fullText) {
            setTypingDelay(pauseDuration); // Pause at the end of the phrase
            setIsDeleting(true);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingDelay(500); // Pause before typing the next word
        }
    };

    return (
        <span className={className}>
            {text}
            <span className="animate-pulse border-r-2 border-[var(--neon-cyan)] ml-[2px] h-full inline-block align-middle relative -top-[2px] opacity-70">
                &nbsp;
            </span>
        </span>
    );
}
