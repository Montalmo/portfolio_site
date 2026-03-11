import React from 'react';

interface SecondaryButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    children,
    onClick,
    href,
    type = 'button',
    className = '',
    disabled = false,
}) => {
    const baseClasses = 'flex cursor-pointer items-center justify-center rounded-full h-14 px-8 border border-white/40 text-slate-300 text-base font-bold transition-all hover:bg-white/10 hover:text-white hover:border-white max-[480px]:w-full max-[480px]:min-w-full';

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-300 hover:border-white/40';

    const combinedClasses = `${baseClasses} ${disabled ? disabledClasses : ''} ${className}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                <span>{children}</span>
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
        </button>
    );
};

export default SecondaryButton;
