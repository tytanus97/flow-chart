import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PanzoomEventsService {
    scaleChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1)
}