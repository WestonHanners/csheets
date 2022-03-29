import { Vector } from "./Vector";

export class Drawable {

    position: Vector

    constructor(position: Vector){
        this.position = position
    }

    begin(context: CanvasRenderingContext2D, point: Vector) {
        console.log("Unimplemented.")
    }

    continue(context: CanvasRenderingContext2D, point: Vector) {
        console.log("Unimplemented.")
    }

    end(context: CanvasRenderingContext2D) {
        console.log("Unimplemented.")
    }

    draw(context: CanvasRenderingContext2D, dt: DOMHighResTimeStamp) {
        console.log("Unimplemented.")
    }

    update(dt: DOMHighResTimeStamp) {
        console.log("Unimplemented.")
    }
}