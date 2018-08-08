import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private subject = new Subject<any>();

  setDivision(d: number) {
    this.subject.next({ division: d });
  }

  getDivision(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {}
}
