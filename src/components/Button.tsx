import React from 'react';

interface ButtonProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    helpText?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           type,
                                           variant,
                                           size,
                                           disabled,
                                           className,
                                           onClick,
                                           helpText,
                                       }) => {
    const baseStyles = 'rounded-md font-medium focus:outline-none';

    const sizeStyles = {
        sm: 'py-1 px-4 text-sm',
        md: 'py-2 px-6 text-md',
        lg: 'py-3 px-8 text-lg',
    };

    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-blue-600',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-800',
    };

    const disabledStyles = disabled ? 'pointer-events-none opacity-50' : '';

    const btnClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`;

    return (
        <button
            type={type}
            className={btnClassName}
            disabled={disabled}
            onClick={onClick}
            title={helpText}
        >
            {label}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    className: '',
    onClick: () => {
    },
    helpText: '',
};

export default Button;
