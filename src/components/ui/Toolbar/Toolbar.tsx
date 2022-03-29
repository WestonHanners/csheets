import './Toolbar.scss';
import { Button } from '../Button/Button';
import { EditingType } from '../../../classes/EditingType'

type ToolbarProps = {
    editingType: string;
    setEditingType: React.Dispatch<React.SetStateAction<EditingType>>
}

export const Toolbar: React.FC<ToolbarProps> = ({ editingType, setEditingType }) => {
    
    function clickedToolbarButton(editingType: EditingType) {
        setEditingType(editingType);
    }

    return (
        <div className="toolbar-palette">
            <ul>
                <Button glyph="brush" selected={ editingType===EditingType.Vector } editingType={ EditingType.Vector } onClick={ clickedToolbarButton } />    
                <Button glyph="image" selected={ editingType===EditingType.Image } editingType={ EditingType.Image } onClick={ clickedToolbarButton } />
                <Button glyph="title" selected={ editingType===EditingType.Expression } editingType={ EditingType.Expression } onClick={ clickedToolbarButton } />    
            </ul>
        </div>
    );
}