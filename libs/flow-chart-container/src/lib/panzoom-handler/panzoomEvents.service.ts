import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PanzoomEventsService {
    scaleChanged: Subject<number> = new Subject<number>()
}