import { Point } from "@angular/cdk/drag-drop"
import { Injectable } from "@angular/core"
import { INITIAL_POSITION, INITIAL_SIZE } from "../drag-handler/draggableElementConstraints"
import { Size } from "@flow-chart/shared"

@Injectable()
export class RectangleService {
    size: Size = { ...INITIAL_SIZE }
    position: Point = { ...INITIAL_POSITION }
    centerPosition: Point

    constructor() {
        this.setCenter()
    }

    setSize(size: Size) {
        this.size = size
        this.setCenter()
    }

    setPosition(point: Point) {
        this.position.x = point.x
        this.position.y = point.y
        this.setCenter()
    }

    private setCenter() {

        this.centerPosition = {
            x: this.position.x + (this.size.width / 2),
            y: this.position.y + (this.size.height / 2)
        }
    }
}