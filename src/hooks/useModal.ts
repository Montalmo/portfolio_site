import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for modal functionality
 * Handles:
 * - Open/close state management
 * - Escape key to close
 * - Body scroll lock
 * - Overlay click to close
 * 
 * This replaces duplicate logic in ContactModal and Lightbox
 * Following DRY principle (Don't Repeat Yourself)
 */
interface UseModalOptions {
    onClose: () => void;
    closeOnOverlayClick?: boolean;
}

export const useModal = ({ onClose, closeOnOverlayClick = true }: UseModalOptions) => {
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose, closeOnOverlayClick]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            }
        };
    }, [handleEscape]);

    return { handleOverlayClick };
};

/**
 * Custom hook for scroll spy functionality
 * Tracks which section is currently visible in viewport
 * Includes throttling for performance
 */
interface UseScrollSpyOptions {
    sectionIds: string[];
    threshold?: number;
    offset?: number;
}

export const useScrollSpy = ({
    sectionIds,
    offset = 100
}: UseScrollSpyOptions) => {
    const activeSectionRef = useRef<string>(sectionIds[0] || 'hero');
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Cancel any pending frame request
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }

            // Use requestAnimationFrame for throttling
            rafIdRef.current = requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + offset;

                for (const section of sectionIds) {
                    const element = document.getElementById(section);
                    if (element) {
                        const offsetTop = element.offsetTop;
                        const offsetHeight = element.offsetHeight;

                        // For the last section, also check if we're at the bottom
                        if (section === 'contact') {
                            const pageHeight = document.documentElement.scrollHeight;
                            const viewportHeight = window.innerHeight;

                            if (scrollPosition >= offsetTop || scrollPosition >= pageHeight - viewportHeight) {
                                activeSectionRef.current = section;
                                break;
                            }
                        } else if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            activeSectionRef.current = section;
                            break;
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [sectionIds, offset]);

    return activeSectionRef;
};

/**
 * Custom hook for Intersection Observer
 * Simplified API for triggering animations on scroll
 */
interface UseIntersectionObserverOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useIntersectionObserver = ({
    threshold = 0.2,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
}: UseIntersectionObserverOptions = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (triggerOnce && hasTriggered) return;

                        setIsVisible(true);
                        if (triggerOnce) {
                            setHasTriggered(true);
                        }
                    } else if (!triggerOnce) {
                        setIsVisible(false);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, hasTriggered]);

    return { elementRef, isVisible, hasTriggered };
};

import { useState } from 'react';
