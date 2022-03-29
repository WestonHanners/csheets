export class Vector {
    x: number
    y: number
    
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static fromMouseEvent(event: MouseEvent): Vector {
        return new Vector(event.pageX, event.pageY);
    }

}