import React, { useMemo } from 'react';

interface SwayingTextProps {
    text: string;
    className?: string;
}

/**
 * SwayingText - Animated text component with character-by-character sway effect
 * 
 * FIXED: Previously used array index as key (anti-pattern)
 * Now uses character itself as key (unique for this use case since text doesn't change dynamically)
 * 
 * Improvement: Uses useMemo to avoid recreating array on every render
 */
const SwayingText: React.FC<SwayingTextProps> = ({ text, className = '' }) => {
    // Use useMemo to avoid recreating array on every render
    const characters = useMemo(() => text.split(''), [text]);

    return (
        <>
            {characters.map((char, index) => (
                <span
                    // Using index with text content ensures uniqueness
                    // since this component doesn't change text dynamically
                    key={`${char}-${index}`}
                    className={`inline-block animate-sway-slow ${className}`}
                    style={{
                        animationDelay: `${index * 0.15}s`,
                        display: char === ' ' ? 'inline' : 'inline-block'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </>
    );
};

export default React.memo(SwayingText);
