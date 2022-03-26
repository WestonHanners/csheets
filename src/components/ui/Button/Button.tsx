import React from 'react';
import './Button.scss';

type ButtonProps = {
    label: string;
};

export const Button: React.FC<ButtonProps> = ({ label }) => {
    return (
        <button className='btn'>
            {label}
        </button>
    )
};
