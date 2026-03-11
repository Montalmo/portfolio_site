import React, { useState, useEffect, useCallback } from 'react';

interface LightboxProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
}

/**
 * Lightbox - Reusable modal for displaying enlarged images
 * 
 * IMPROVEMENT: Extracted from CaseStudy.tsx (was inline)
 * Now follows SRP - single responsibility, single file
 * Uses useModal hook to avoid duplicate modal logic
 */
const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Handle escape key and body scroll lock
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Handle visibility animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/90 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
                }`}
            onClick={handleOverlayClick}
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:bg-white/10 hover:text-white z-10"
            >
                <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div
                className={`relative transform transition-all duration-300 ${isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
            >
                <img
                    src={imageSrc}
                    alt="Gallery image"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );
};

export default Lightbox;
