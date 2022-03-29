import React from 'react'
import { EditingType } from '../../../classes/EditingType';
import './Button.scss'

type ButtonProps = {
    glyph?: string;
    selected: boolean;
    editingType: EditingType
    onClick: (editingType: EditingType) => void;
};

export const Button: React.FC<ButtonProps> = ({
    glyph = 'home',
    selected = false,
    editingType = EditingType.None,
    onClick
}) => {

    function onClickHandler(event: any) {
        onClick(editingType)
    }

    return (
        <button className={ selected ? "btn mdc-icon-button--on material-icons active" : "btn mdc-icon-button material-icons" } onClick={ onClickHandler }>
            <div className="mdc-icon-button"></div>
            { glyph }
        </button>
    )
};
