import { Drawable } from "./Drawable";
import { Vector } from "./Vector";

export class VectorDrawing extends Drawable {
    path: Array<Vector>

    constructor(position: Vector, path: Array<Vector>) {
        super(position)
        this.path = path
    }

    begin(context: CanvasRenderingContext2D, point: Vector) {
        context.lineCap = "round"
        context.beginPath()
        context.moveTo(point.x, point.y)
        
        this.path.push(point)
    }

    continue(context: CanvasRenderingContext2D, point: Vector) {
        context.lineTo(point.x, point.y)
        context.stroke()

        this.path.push(point)
    }

    end(context: CanvasRenderingContext2D) {
        console.log("Nothing to do... yet.")
    }

    draw(context: CanvasRenderingContext2D, dt: DOMHighResTimeStamp) {      
        var path: Array<Vector> = this.path;

        const firstPoint = path.pop()

        if (firstPoint == null) {
            return
        }
        
        context.save()
        context.beginPath()
        context.moveTo(firstPoint.x, firstPoint.y)

        path.forEach(point => {
            context.lineTo(point.x, point.y)
        });

        context.closePath()
        context.restore()
    }
}