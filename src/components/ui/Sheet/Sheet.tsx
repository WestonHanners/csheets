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
}

export const Sheet: React.FC<SheetProps> = ({
    editingType = EditingType.None,
    drawables = [],
    setDrawables
}) => {

    let lastFrame: DOMHighResTimeStamp = 0;
    var currentDrawable: Drawable | null;

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
        console.log("Resized: " + canvasRef.current.width + " " + canvasRef.current.height);
    }

    function onMouseDown(event: any) {
        if (editingType === EditingType.Vector) {
            onStartDrawing(event)
            return;
        }
        if (editingType === EditingType.Expression) {
            if (currentDrawable == null) {
                onStartDrawing(event)
            } else {
                onEndDrawing(event)
            }
        }
    }

    function onMouseMove(event: any) {
        if (editingType === EditingType.Vector) {
            onDraw(event)
        }
    }

    function onMouseUp(event: any) {
        if (editingType === EditingType.Vector) {
            onEndDrawing(event)
        }
    }

    function onMouseOut(event: any) {
        if (editingType === EditingType.Vector) {
            onEndDrawing(event)
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        if (editingType === EditingType.Vector) {
            return // Do Nothing Here.
        }
        if (editingType === EditingType.Expression) {
            if (event.key === "enter") {
                onEndDrawing(event)
            }else {
                onDraw(event)
            }
            return
        }
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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener('resize', canvasResize)
    // TODO: This feature is not yet ready.
    window.requestAnimationFrame(redrawWrapper)

    return (
        <div contentEditable="true">
            <canvas ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    className="primary-canvas" 
                    onMouseDown={ onMouseDown } 
                    onMouseMove={ onMouseMove }
                    onMouseUp={ onMouseUp } 
                    onMouseOut={onMouseOut }
            >
            </canvas>
        </div>
    );
}