import { KeyboardEvent } from "react";
import { Drawable } from "./Drawable";
import { Vector } from "./Vector";

export class TextDrawing extends Drawable {
    value: string = ""

    constructor(position: Vector, value: string) {
        super(position);
        this.value = value;
    }

    configureContext(context: CanvasRenderingContext2D) {
        context.lineCap = "round";
        context.lineJoin = "round";
        context.font = "24px serif"
        context.strokeStyle = 'rgba(30, 30, 30, 1)';
    }

    begin(context: CanvasRenderingContext2D, point: Vector) {
        this.configureContext(context);
        this.position = point;
    }

    continue(context: CanvasRenderingContext2D, event: any): void {
        const keyEvent = event as KeyboardEvent;
        
        if (keyEvent.key == null) {
            return;
        }

        if (keyEvent.key === "Backspace") {
            this.value = this.value.slice(0, this.value.length - 1)
        } else if (keyEvent.key.length === 1) {
            this.value += keyEvent.key;
        }

        let size = context.measureText(this.value)

        context.fillText(this.value, this.position.x, this.position.y);
    }

    end(context: CanvasRenderingContext2D): void {
        // No Operation
    }

    draw(context: CanvasRenderingContext2D, dt: number): void {
        context.fillText(this.value, this.position.x, this.position.y);
    }
}