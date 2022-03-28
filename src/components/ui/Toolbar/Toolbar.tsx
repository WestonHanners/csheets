import './Toolbar.scss';
import { Button } from '../Button/Button';

type ToolbarProps = {
    editingState: string;
    setEditingState: React.Dispatch<React.SetStateAction<string>>
}

export const Toolbar: React.FC<ToolbarProps> = ({ editingState, setEditingState }) => {
    function clickedToolbarButton(event: any) {
        editingState = event.target.innerText;
        setEditingState(event.target.innerText);
    }

    return (
        <div className="toolbar-palette">
            <ul>
                <Button glyph="image" selected={ editingState==="image" } onClick={ clickedToolbarButton } />
                <Button glyph="brush" selected={ editingState==="brush" } onClick={ clickedToolbarButton } />    
                <Button glyph="title" selected={ editingState==="title" } onClick={ clickedToolbarButton } />    
            </ul>
        </div>
    );
}