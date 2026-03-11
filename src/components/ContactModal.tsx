import React, { useState, useEffect, useCallback } from 'react';
import { contactMethods } from '../data/projects';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * ContactModal - Modal for displaying contact options
 * 
 * IMPROVEMENTS:
 * 1. Uses external contactMethods data (DIP)
 * 2. Proper cleanup of event listeners
 * 3. Uses useCallback for stable function references
 */
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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

    // Handle visibility animation - use setTimeout to avoid ESLint warning about setState in effect
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 0);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
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
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
                }`}
            onClick={handleOverlayClick}
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            <div
                className={`relative w-full max-w-md transform transition-all duration-300 ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                    }`}
            >
                {/* Modal Content */}
                <div className="rounded-3xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl p-8 shadow-2xl">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    {/* Contact Buttons - now using external data */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {contactMethods.map((method) => (
                            <a
                                key={method.name}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[140px] flex items-center justify-center gap-2 rounded-full h-12 px-4 border-2 border-white/50 bg-white/5 text-slate-300 text-base font-bold transition-all hover:bg-white/10 hover:text-white hover:border-violet-400"
                            >
                                <span className="material-symbols-outlined text-xl text-violet-500">
                                    {method.icon}
                                </span>
                                <span>{method.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
