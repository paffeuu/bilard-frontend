import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export var properties;

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) {
    properties = {};
    this.sendAllProperties();
  }

  sendAllProperties() {
    this.http.put(`${environment.url}/set-properties`, properties)
      .subscribe(
        response => properties = response,
        error => console.log(error)
      );
    console.log(properties);
  }

  setShowPreviousPosition(showPrevPos: boolean) {
    properties.showPreviousPosition = showPrevPos;
    this.sendAllProperties();
  }

  setDebugActive(debugActive: boolean) {
    properties.debugActive = debugActive;
    this.sendAllProperties();
  }

  setGameMode(gameMode: number) {
    properties.gameMode = gameMode;
    this.sendAllProperties();
  }
}
