import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreviousPositionService {

  constructor(private http: HttpClient) { }

  setShowPrevPosition() {
    this.http.get(`${environment.url}/set-visible`)
      .subscribe(
        response => console.log(response),
        error => console.log(error));
  }
}
