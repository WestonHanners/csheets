import { EditingType } from '../../../classes/EditingType'
import { useRef } from 'react'
import { Drawable } from '../../../classes/Drawable';
import { VectorDrawing } from '../../../classes/VectorDrawing';
import { Vector } from '../../../classes/Vector';

type SheetProps = {
    editingType: EditingType
    drawables: Array<Drawable>
}

export const Sheet: React.FC<SheetProps> = ({
    editingType = EditingType.None,
    drawables = []
}) => {

    let isDrawing: boolean = false;
    let lastFrame: DOMHighResTimeStamp = 0;
    var currentDrawable: Drawable;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    function redrawWrapper(timestamp: DOMHighResTimeStamp) {
        let dt = lastFrame - timestamp;
        redraw(dt);
    }

    function redraw(dt: DOMHighResTimeStamp) {
        if (canvasRef.current == null) {
            return;
        }
        const canvas = canvasRef.current

        // TODO: find a better way to do this.
        const context = canvas.getContext("2d")!

        drawables.forEach(drawable => {
            drawable.draw(context, dt);
        });

        window.requestAnimationFrame(redrawWrapper)
    }

    function canvasResize(event: any) {
        if (canvasRef.current == null) {
            return;
        }

        console.log("resizing");
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
    }

    function onStartDrawing(event: any) {     
        if (currentDrawable != null) {
            return;
        }

        const context = canvasRef.current?.getContext("2d")!;

        isDrawing = true;
        let currentPosition = Vector.fromMouseEvent(event);
        currentDrawable = new VectorDrawing(currentPosition, []);
    }

    function onEndDrawing(event: any) {
        if (currentDrawable == null) {
            return
        }

        const context = canvasRef.current?.getContext("2d")!
        currentDrawable.end(context)
        
        drawables.push(currentDrawable)
        currentDrawable = null
        isDrawing = false
    }

    function onDraw(event: any) {
        if (!isDrawing || currentDrawable == null) {
            return
        }

        const context = canvasRef.current?.getContext("2d")!

        let currentPosition = Vector.fromMouseEvent(event)
        currentDrawable?.continue(context, currentPosition)
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