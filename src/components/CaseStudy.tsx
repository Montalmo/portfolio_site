import { useState, useEffect, useCallback } from 'react';
import saLogo from '../assets/sa_logo.svg';

interface CaseStudyProps {
    project: {
        id: number;
        category: string;
        title: string;
        description: string;
        image: string;
        task?: string;
        solution?: string;
        gallery?: string[];
    };
    prevCase?: { id: number; title: string } | null;
    nextCase?: { id: number; title: string } | null;
    onNavigate?: (id: number) => void;
    onBack?: () => void;
    onOpenContact?: () => void;
}

// Lightbox Modal Component (reusing ContactModal pattern)
interface LightboxProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

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

const CaseStudy: React.FC<CaseStudyProps> = ({ project, prevCase, nextCase, onNavigate, onBack, onOpenContact }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');

    // Default gallery images if not provided - use placeholders
    const galleryImages = project.gallery || [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
    ];

    const openLightbox = (imageSrc: string) => {
        setLightboxImage(imageSrc);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxImage('');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-slate-100 antialiased font-sans">
            <div className="layout-container flex h-full grow flex-col">
                {/* Navigation Header */}
                <header className="fixed top-0 left-0 w-full h-20 bg-zinc-950/80 backdrop-blur-lg z-50 border-b border-white/5 flex justify-center">
                    <div className="w-full max-w-[1240px] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <a href="#hero" className="flex items-center gap-2 cursor-pointer">
                                <img
                                    src={saLogo}
                                    alt="ELARA"
                                    className="h-10 w-auto"
                                />
                            </a>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                                На головну
                            </button>
                            <button onClick={onOpenContact} className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-bold transition-all hover:bg-violet-500/20">
                                <span>Співпраця</span>
                            </button>
                        </nav>
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={onBack} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                                <span className="material-symbols-outlined">home</span>
                            </button>
                            <button onClick={onOpenContact} className="text-violet-400 text-sm font-medium">
                                Співпраця
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full flex flex-col items-center justify-center">
                    {/* Hero Section - Project Cover */}
                    <section className="relative w-full">
                        {/* Cover Image */}
                        <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] relative overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                                <div className="max-w-[1240px] mx-auto">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        {project.category}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
                                        {project.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description Block - Two Columns */}
                    <section className="relative w-full px-6 md:px-12 py-16 md:py-24">
                        <div className="max-w-[1240px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                                {/* Task Column */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-violet-500">assignment</span>
                                        </div>
                                        <h2 className="text-white text-2xl font-bold">Задача</h2>
                                    </div>
                                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                        {project.task || project.description || 'Основна мета проекту полягала у створенні інноваційного рішення, яке відповідає найвищим стандартам користувацького досвіду та бізнес-вимогам.'}
                                    </p>
                                </div>

                                {/* Solution Column */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-violet-500">lightbulb</span>
                                        </div>
                                        <h2 className="text-white text-2xl font-bold">Рішення</h2>
                                    </div>
                                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                        {project.solution || 'Було розроблено комплексний дизайн-проект, що включає інтуїтивний інтерфейс, сучасну візуальну систему та оптимізовану архітектуру взаємодії з користувачем.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Section - 4 Images Grid */}
                    <section className="relative w-full px-6 md:px-12 py-8 pb-16 md:pb-24">
                        <div className="max-w-[1240px] mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {galleryImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/5"
                                        onClick={() => openLightbox(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-14 h-14 rounded-full bg-violet-500/80 flex items-center justify-center backdrop-blur-sm">
                                                    <span className="material-symbols-outlined text-white text-2xl">zoom_in</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Navigation Buttons */}
                    <section className="relative w-full px-6 md:px-12 py-8 pb-24">
                        <div className="max-w-[1240px] mx-auto">
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between items-stretch sm:items-center">
                                {/* Previous Case Button */}
                                {prevCase ? (
                                    <button
                                        onClick={() => onNavigate?.(prevCase.id)}
                                        className="group flex cursor-pointer items-center justify-center gap-2 rounded-full h-12 px-5 border border-white/10 bg-white/5 text-slate-300 text-sm font-bold transition-all hover:bg-white/10 hover:text-white hover:border-white/20 w-full sm:w-auto sm:max-w-[200px]"
                                    >
                                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                        <span className="truncate">Попередній кейс</span>
                                    </button>
                                ) : (
                                    <div className="flex-1" />
                                )}

                                {/* Next Case Button */}
                                {nextCase ? (
                                    <button
                                        onClick={() => onNavigate?.(nextCase.id)}
                                        className="group flex cursor-pointer items-center justify-center gap-2 rounded-full h-12 px-5 bg-violet-600 text-white text-sm font-bold transition-all hover:scale-[1.02] hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] w-full sm:w-auto sm:max-w-[200px]"
                                    >
                                        <span className="truncate">Наступний кейс</span>
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                ) : (
                                    <div className="flex-1" />
                                )}
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer - Using main page footer */}
                <footer className="w-full bg-zinc-950 border-t border-white/5 pt-20 pb-12">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-center">
                            <div className="flex justify-start">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="material-symbols-outlined text-violet-500">location_on</span>
                                    <span className="font-medium">Харків, Україна</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
                                <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">language</span>
                                    Dribbble
                                </a>
                                <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">hub</span>
                                    LinkedIn
                                </a>
                                <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">photo_camera</span>
                                    Instagram
                                </a>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={onBack}
                                    className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-500 hover:border-violet-500 transition-all active:scale-90"
                                >
                                    <span className="material-symbols-outlined">expand_less</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-500 text-sm">© 2024 Портфоліо UI/UX Дизайнера. Всі права захищено.</p>
                            <div className="flex gap-6 text-slate-500 text-sm">
                                <a className="hover:text-violet-500 transition-colors" href="#">Політика конфіденційності</a>
                                <a className="hover:text-violet-500 transition-colors" href="#">Умови використання</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Lightbox Modal */}
            <Lightbox
                isOpen={lightboxOpen}
                imageSrc={lightboxImage}
                onClose={closeLightbox}
            />
        </div>
    );
};

export default CaseStudy;
