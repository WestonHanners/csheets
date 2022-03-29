export class Vector {
    x: number
    y: number
    
    constructor(x = 0, y = 0) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }

    static fromMouseEvent(event: MouseEvent): Vector {
        return new Vector(event.pageX, event.pageY);
    }

}