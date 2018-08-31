import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private divisionLinesSubject = new Subject<any>();

  setDivisionLines(d: number): void {
    this.divisionLinesSubject.next({ division: d });
  }

  getDivisionLines(): Observable<any> {
    return this.divisionLinesSubject.asObservable();
  }

  constructor() {}
}
