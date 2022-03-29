import { Drawable } from "./Drawable";
import { Vector } from "./Vector";

export class VectorDrawing extends Drawable {
    path: Array<Vector>

    constructor(position: Vector, path: Array<Vector>) {
        super(position)
        this.path = path
    }

    configureContext(context: CanvasRenderingContext2D) {
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.strokeStyle = 'rgba(30, 30, 30, 1)';
    }

    begin(context: CanvasRenderingContext2D, point: Vector) {
        this.configureContext(context)

        context.beginPath()
        context.moveTo(point.x, point.y)

        this.path.push(point)
    }

    continue(context: CanvasRenderingContext2D, point: Vector) {
        context.lineTo(point.x, point.y)
        context.stroke()

        context.moveTo(point.x, point.y)

        this.path.push(point)
    }

    end(context: CanvasRenderingContext2D) {
        console.log("Nothing to do... yet.")
    }

    draw(context: CanvasRenderingContext2D, dt: DOMHighResTimeStamp) {      
        var path: Array<Vector> = this.path;

        const firstPoint = path[0]

        if (firstPoint == null) {
            return
        }
        
        this.configureContext(context)

        context.save()
        context.beginPath()
        context.moveTo(firstPoint.x, firstPoint.y)

        path.forEach(point => {
            context.lineTo(point.x, point.y)
        });

        context.stroke()
        context.restore()
    }
}