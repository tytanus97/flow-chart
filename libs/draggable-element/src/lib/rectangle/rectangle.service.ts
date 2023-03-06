import { Point } from "@angular/cdk/drag-drop"
import { Size } from "../models/size"
import { Injectable } from "@angular/core"
import { INITIAL_POSITION } from "../drag-handler/draggableElementConstraints"

@Injectable()
export class RectangleService {
    size: Size
    position: Point
    centerPosition: Point

    constructor() {
        this.position = { ...INITIAL_POSITION }
    }

    setSize(size: Size) {
        this.size = size
        this.setCenter(size)
    }

    setPosition(point: Point) {
        this.position.x = point.x
        this.position.y = point.y
    }

    private setCenter(size: Size) {
        this.centerPosition = {
            x: this.position.x + (size.width / 2),
            y: this.position.y + (size.height / 2)
        }
    }
}