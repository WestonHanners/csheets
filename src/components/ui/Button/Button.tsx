import React from 'react'
import './Button.scss'

type ButtonProps = {
    glyph?: string;
    selected: boolean;
    onClick: (event: any) => void;
};

export const Button: React.FC<ButtonProps> = ({
    glyph = 'home',
    selected = false,
    onClick
}) => {

    return (
        <button className={ selected ? "btn mdc-icon-button--on material-icons active" : "btn mdc-icon-button material-icons" } onClick={ onClick }>
            <div className="mdc-icon-button"></div>
            { glyph }
        </button>
    )
};
