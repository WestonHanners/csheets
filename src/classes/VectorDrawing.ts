import { Drawable } from "./Drawable";
import { Vector } from "./Vector";

export class VectorDrawing extends Drawable {
    path: Array<Vector>

    constructor(position: Vector, path: Array<Vector>) {
        super(position)
        this.path = path
    }

    begin(context: CanvasRenderingContext2D, point: Vector) {
        context?.beginPath()
        context?.moveTo(point.x, point.y)
    }

    continue(context: CanvasRenderingContext2D, point: Vector) {
        context?.lineTo(point.x, point.y)
        context?.stroke()
    }

    end(context: CanvasRenderingContext2D) {
        context?.closePath()
    }

    draw(context: CanvasRenderingContext2D, dt: DOMHighResTimeStamp) {
        context.beginPath()
        
        var path: Array<Vector> = this.path;

        context.save()
        const firstPoint = path.pop()

        if (firstPoint == null) {
            return
        
        }
        context.moveTo(firstPoint.x, firstPoint.y)

        path.forEach(point => {
            context.lineTo(point.x, point.y)
        });

        context.closePath()
        context.restore()
    }
}