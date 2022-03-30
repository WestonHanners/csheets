import { EditingType } from "./EditingType";

export type InputHandlerCallback = (event: any) => void;

export class InputAdaptor {

    // State
    editingType: EditingType = EditingType.None;
    activeDrawable: boolean = false;

    // Callbacks
    onDraw?: InputHandlerCallback;
    onStartDrawing?: InputHandlerCallback;
    onEndDrawing?: InputHandlerCallback;

    constructor(editingType: EditingType, activeDrawable: boolean) {
        this.editingType = editingType;
        this.activeDrawable = activeDrawable;
    }

    onMouseDown(event: any) {
        if (this.editingType === EditingType.Vector) {
            this.onStartDrawing?.(event);
            return;
        }

        if (this.editingType === EditingType.Expression) {
            if (this.activeDrawable == false) {
                this.onStartDrawing?.(event);
            } else {
                this.onEndDrawing?.(event);
            }
        }
    }

    onMouseMove(event: any) {
        if (this.editingType === EditingType.Vector) {
            this.onDraw?.(event);
            return;
        }
    }

    onMouseUp(event: any) {
        if (this.editingType === EditingType.Vector) {
            this.onEndDrawing?.(event);
            return;
        }
    }

    onMouseOut(event: any) {
        if (this.editingType === EditingType.Vector) {
            this.onEndDrawing?.(event);
            return;
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.editingType === EditingType.Vector) {
            return; // Do Nothing Here.
        }
        if (this.editingType === EditingType.Expression) {
            if (event.key === "Enter") {
                this.onEndDrawing?.(event);
                return;
            } else {
                this.onDraw?.(event);
                event.preventDefault();
                return;
            }
            return
        }
    }

}