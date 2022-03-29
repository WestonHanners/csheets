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
                break
            case EditingType.Expression:
                break
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

        window.requestAnimationFrame(redrawWrapper)
    }

    function canvasResize(event: any) {
        if (canvasRef.current == null) {
            return;
        }

        canvasRef.current.width = window.innerWidth;// * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight;// * window.devicePixelRatio;
        console.log("Resized: " + canvasRef.current.width + " " + canvasRef.current.height);
    }

    function onStartDrawing(event: any) {     
        if (currentDrawable != null) {
            return;
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

        let currentPosition = Vector.fromMouseEvent(event)
        currentDrawable?.continue(context, currentPosition)
    }

    function onEndDrawing(event: any) {
        if (currentDrawable == null) {
            return
        }

        const context = canvasRef.current?.getContext("2d")!
        currentDrawable.end(context)
        
        drawables.push(currentDrawable)
        currentDrawable = null
    }

    window.addEventListener('resize', canvasResize)
    // TODO: This feature is not yet ready.
    // window.requestAnimationFrame(redrawWrapper)

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