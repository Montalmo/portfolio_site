import React, { useEffect, useState } from 'react';

interface Bubble {
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
}

const FooterBubbleAnimation: React.FC = () => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer state update to avoid ESLint warning about setState in effect
        const timer = setTimeout(() => setMounted(true), 0);

        // Generate initial bubbles
        const generateBubbles = () => {
            const newBubbles: Bubble[] = [];
            const count = 12;

            for (let i = 0; i < count; i++) {
                newBubbles.push({
                    id: i,
                    left: Math.random() * 100,
                    size: Math.random() * 20 + 10,
                    delay: Math.random() * 5,
                    duration: Math.random() * 5 + 8,
                });
            }
            setBubbles(newBubbles);
        };

        generateBubbles();

        // Regenerate bubbles periodically
        const interval = setInterval(() => {
            setBubbles(prev => {
                const newBubble: Bubble = {
                    id: Date.now(),
                    left: Math.random() * 100,
                    size: Math.random() * 20 + 10,
                    delay: 0,
                    duration: Math.random() * 5 + 8,
                };
                return [...prev.slice(-15), newBubble];
            });
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="footer-bubble"
                    style={{
                        left: `${bubble.left}%`,
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        animationDelay: `${bubble.delay}s`,
                        animationDuration: `${bubble.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default FooterBubbleAnimation;
