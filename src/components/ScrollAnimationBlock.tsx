import React, { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollAnimationBlockProps {
    children: ReactNode;
    delay?: number; // Delay in seconds (0.1-0.2 increment for cascading effect)
    className?: string;
}

/**
 * ScrollAnimationBlock - A component that animates its content when it enters the viewport
 * 
 * Features:
 * - Float animation from bottom to top (translateY)
 * - Opacity fade from 0 to 1
 * - Uses Intersection Observer API for scroll-triggered animation
 * - Configurable delay for cascading effect
 * - Keeps final state after animation completes
 */
const ScrollAnimationBlock: React.FC<ScrollAnimationBlockProps> = ({
    children,
    delay = 0,
    className = ''
}) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const animationCompleteRef = useRef(false);

    useEffect(() => {
        const blockElement = blockRef.current;
        if (!blockElement) return;

        // Set initial styles for the block before animation
        blockElement.style.opacity = '0';

        const handleAnimationEnd = () => {
            animationCompleteRef.current = true;
            setAnimationComplete(true);
        };

        blockElement.addEventListener('animationend', handleAnimationEnd);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animationCompleteRef.current) {
                        setIsVisible(true);
                        // Don't unobserve - we want to keep tracking in case element goes out and back in
                    }
                });
            },
            {
                // Start animation when block is 5% visible
                threshold: 0.05,
                // Offset to trigger much earlier on mobile
                rootMargin: '0px 0px -180px 0px'
            }
        );

        observer.observe(blockElement);

        return () => {
            observer.disconnect();
            blockElement.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);

    // Calculate animation delay (increase by 0.1-0.2s for each subsequent block)
    const animationDelay = `${delay}s`;

    // Animation duration (0.6-0.8 seconds as specified)
    const animationDuration = '0.7s';

    // After animation completes, keep final state
    const showFinalState = animationComplete;

    // Combine classes for the animated block
    const animatedClass = isVisible && !animationComplete
        ? `animate-scroll-float ${className}`
        : className;

    return (
        <div
            ref={blockRef}
            className={animatedClass}
            style={{
                // Initial state before animation, final state after animation completes
                opacity: showFinalState ? 1 : (isVisible ? undefined : 0),
                transform: showFinalState ? 'none' : (isVisible ? undefined : 'translateY(60px)'),
                // Remove animation after completion to avoid transform containment
                animation: showFinalState ? 'none' : undefined,
                // Apply animation delay when visible (only during animation)
                animationDelay: isVisible && !animationComplete ? animationDelay : undefined,
                animationDuration: animationComplete ? undefined : animationDuration,
                animationTimingFunction: animationComplete ? undefined : 'ease-out',
                // Will-change for performance optimization
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimationBlock;
