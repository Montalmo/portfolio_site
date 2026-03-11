import React from 'react';

interface TertiaryButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
}) => {
    const baseClasses = 'flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-bold transition-all hover:bg-violet-500/20';

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-violet-500/10';

    const combinedClasses = `${baseClasses} ${disabled ? disabledClasses : ''} ${className}`;

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

export default TertiaryButton;
