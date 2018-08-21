import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private divisionLinesSubject = new Subject<any>();
  private cueBallsHighlightSubject = new Subject<any>();

  setDivisionLines(d: number): void {
    this.divisionLinesSubject.next({ division: d });
  }

  getDivisionLines(): Observable<any> {
    return this.divisionLinesSubject.asObservable();
  }

  setCueBallsHighlight(balls: number): void {
    this.cueBallsHighlightSubject.next({ highlight: balls })
  }

  getCueBallsHighlight(): Observable<any> {
    return this.cueBallsHighlightSubject.asObservable();
  }

  constructor() {}
}
