import { EditingType } from '../../../classes/EditingType'
import { useRef } from 'react'
import { Drawable } from '../../../classes/Drawable';
import { VectorDrawing } from '../../../classes/VectorDrawing';
import { TextDrawing } from '../../../classes/TextDrawing';
import { Vector } from '../../../classes/Vector';

type SheetProps = {
    editingType: EditingType
    drawables: Array<Drawable>
    setDrawables: React.Dispatch<React.SetStateAction<Drawable[]>>
    currentDrawable: Drawable | null
}

export const Sheet: React.FC<SheetProps> = ({
    editingType = EditingType.None,
    drawables = [],
    setDrawables,
    currentDrawable = null
}) => {

    let lastFrame: DOMHighResTimeStamp = 0;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    function newDrawable(position: Vector): Drawable | null {
        switch (editingType) {
            case EditingType.None:
                break;
            case EditingType.Vector:
                return new VectorDrawing(position, []);
            case EditingType.Image:
                break;
            case EditingType.Expression:
                return new TextDrawing(position, "Label");
        }

        console.log("Unimplemented Drawable: " + editingType)
        return null
    }

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
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawables.forEach(drawable => {
            drawable.draw(context, dt);
        });

        currentDrawable?.draw(context,dt)

        window.requestAnimationFrame(redrawWrapper)
    }

    function saveDrawing() {
        setDrawables(drawables)
    }

    function canvasResize(event: any) {
        if (canvasRef.current == null) {
            return;
        }

        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }

    function onStartDrawing(event: any) {     
        if (currentDrawable != null) {
            onEndDrawing(event)
        }

        const context = canvasRef.current?.getContext("2d")!;
        let currentPosition = Vector.fromMouseEvent(event);
        let drawable = newDrawable(currentPosition)

        if (drawable == null) {
            return;
        }

        currentDrawable = drawable
        currentDrawable.begin(context, currentPosition)
    }

    function onDraw(event: any) {
        if (currentDrawable == null) {
            return
        }

        const context = canvasRef.current?.getContext("2d")!

        currentDrawable?.continue(context, event)
    }

    function onEndDrawing(event: any) {
        if (currentDrawable == null) {
            return
        }

        const context = canvasRef.current?.getContext("2d")!
        currentDrawable.end(context)

        drawables.push(currentDrawable)
        saveDrawing()
        currentDrawable = null
    }

    // Setup Event Listeners
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener('resize', canvasResize)

    // This call ensures the drawing is not lost on state
    // resets.
    window.requestAnimationFrame(redrawWrapper)

    return (
        <div>
            <canvas ref={ canvasRef }
                width={ window.innerWidth }
                height={ window.innerHeight }
                className="primary-canvas" 
                onMouseDown={ onMouseDown } 
                onMouseMove={ onMouseMove }
                onMouseUp={ onMouseUp } 
                onMouseOut={onMouseOut }
            >
                This Application Requires Canvas
            </canvas>
        </div>
    );
}