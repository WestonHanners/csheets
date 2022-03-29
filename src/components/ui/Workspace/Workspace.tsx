import React, { useState } from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import { Drawable } from "../../../classes/Drawable";
import { Sheet } from '../Sheet/Sheet'
import { EditingType } from '../../../classes/EditingType'

import './Workspace.scss'

export const Workspace = () => {
    
    const [editingType, setEditingType] = useState(EditingType.Vector)
    const [drawables, setDrawables] = useState(Array<Drawable>())

    return(
        <div>
            <Sheet editingType={ editingType } drawables={ drawables } setDrawables={ setDrawables }/>
            <Toolbar editingType = { editingType } setEditingType={ setEditingType }/>
        </div>
    );
}