import React, { useState } from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import './Workspace.scss'

export const Workspace = () => {
    
    const [editingState, setEditingState] = useState("None")

    return(
        <div>
            <canvas className="primary-canvas"></canvas>
            <Toolbar editingState = { editingState} setEditingState={ setEditingState }/>
        </div>
    );
}