import React, { ReactNode } from 'react';
import './style.sass';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string
}

const Button: React.FC<ButtonProps> = ({children, onClick, className}) => {
    return (
        <button
            className={`button ${className}`}
            onClick={onClick}

        >
            {children}
        </button>
    );
};

export default Button;