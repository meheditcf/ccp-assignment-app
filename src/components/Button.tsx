import React from 'react';

interface ButtonProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           type = 'button',
                                           variant = 'primary',
                                           disabled = false,
                                           className = '',
                                           onClick,
                                       }) => {
    const baseStyles = 'py-2 px-5 rounded-md font-medium text-sm focus:outline-none';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-800',
    };

    const disabledStyles = disabled
        ? 'pointer-events-none opacity-50'
        : '';


    const btnClassName = `${baseStyles} ${variantStyles[variant || "primary"]} ${className} ${disabledStyles}`;


    return (
        <button
            type={type}
            className={btnClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

Button.defaultProps = {
    type: "button",
    variant: "primary",
    disabled: false,
    className: "",
    onClick: () => {
    },
};

export default Button;
