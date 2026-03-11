import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
    start?: number;
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
    animationEnabled?: boolean;
}

/**
 * Counter - Animated number counter that triggers on viewport entry
 * 
 * IMPROVEMENTS:
 * 1. Added animationEnabled prop to allow resetting animation
 * 2. Lowered threshold from 1 to 0.3 for better UX (triggers when 30% visible)
 * 3. Added proper cleanup for animation frame
 * 4. Handles edge case where start > end (counts down instead)
 */
const Counter: React.FC<CounterProps> = ({
    start = 0,
    end,
    duration = 2000,
    suffix = '',
    className = '',
    animationEnabled = true
}) => {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    const hasAnimatedRef = useRef(!animationEnabled);

    useEffect(() => {
        if (animationEnabled) {
            hasAnimatedRef.current = false;
        }
    }, [animationEnabled]);

    useEffect(() => {
        const counterElement = counterRef.current;
        if (!counterElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimatedRef.current && animationEnabled) {
                        hasAnimatedRef.current = true;
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(counterElement);
        return () => observer.disconnect();
    }, [animationEnabled]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const isCountingDown = start > end;
        const totalChange = Math.abs(end - start);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            let currentValue: number;
            if (isCountingDown) {
                currentValue = start - (totalChange * percentage);
            } else {
                currentValue = start + (totalChange * percentage);
            }

            setCount(Math.floor(currentValue));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, start, end, duration]);

    return (
        <span
            ref={counterRef}
            className={`tabular-nums inline-flex items-center justify-center ${className}`}
            style={{ minWidth: '4ch' }}
        >
            {count}{suffix}
        </span>
    );
};

export default React.memo(Counter);
