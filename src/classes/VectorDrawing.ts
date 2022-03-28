import { Drawable } from "./Drawable";
import { Vector } from "./Vector";

export class VectorDrawing extends Drawable {
    path: Array<Vector>

    constructor(position: Vector, path: Array<Vector>) {
        super(position)
        this.path = path
    }

    draw() {
        
    }
}