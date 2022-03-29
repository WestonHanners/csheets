import { drawerClasses } from '@mui/material';
import { EditingType } from '../../../classes/EditingType'
import { useRef } from 'react'

type SheetProps = {
    editingType: EditingType
}

export const Sheet: React.FC<SheetProps> = ({
    editingType = EditingType.None,
}) => {

    let isDrawing: boolean = false;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function canvasResize(event: any) {
        canvasRef.current?.width = window.innerWidth ?? 0
        canvasRef.current?.height = window.innerHeight ?? 0
    }

    function onStartDrawing(event: any) {
        const context = canvasRef.current?.getContext("2d")
        console.log("Started" + context)
        isDrawing = true
        context?.beginPath()
        context?.moveTo(event.clientX, event.clientY)
    }

    function onEndDrawing(event: any) {
        const context = canvasRef.current?.getContext("2d")
        isDrawing = false
        context?.closePath()
        console.log("Done")
    }

    function onDraw(event: any) {
        if (!isDrawing) {
            return
        }
        const context = canvasRef.current?.getContext("2d")
        console.log("position X:" + event.clientX + " Y:" + event.clientY)
        context?.lineTo(event.clientX, event.clientY)
        context?.stroke()

    }

    window.addEventListener('resize', canvasResize)

    return (
        <div>
            <canvas ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    className="primary-canvas" 
                    onMouseDown={ onStartDrawing } 
                    onMouseMove={ onDraw }
                    onMouseUp={ onEndDrawing } 
                    onMouseOut={onEndDrawing }
            >
            </canvas>
        </div>
    );
}