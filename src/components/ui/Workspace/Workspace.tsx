import React, { useState } from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import { Sheet } from '../Sheet/Sheet'
import { EditingType } from '../../../classes/EditingType'

import './Workspace.scss'

export const Workspace = () => {
    
    const [editingType, setEditingType] = useState(EditingType.None)

    return(
        <div>
            <Sheet editingType={ editingType } drawables={ [] } />
            <Toolbar editingType = { editingType } setEditingType={ setEditingType }/>
        </div>
    );
}