import React from 'react';

interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    href,
    type = 'button',
    className = '',
    disabled = false,
}) => {
    const baseClasses = 'group flex cursor-pointer items-center justify-center gap-2 rounded-full h-14 px-8 bg-violet-600 text-white text-base font-bold transition-all hover:scale-105 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] border-2 border-violet-400 max-[480px]:w-full max-[480px]:min-w-full';

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100 hover:bg-violet-600';

    const combinedClasses = `${baseClasses} ${disabled ? disabledClasses : ''} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                <span>{children}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                </span>
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClasses}
        >
            <span>{children}</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
            </span>
        </button>
    );
};

export default PrimaryButton;
