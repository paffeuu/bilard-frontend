import { Injectable } from '@angular/core';
import {BallModel} from "../model/ball.model";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BallPocketChooseService {

  private lastClickedCueBallSubject = new Subject<BallModel>();
  private drawPocketsSubject = new Subject<any>();
  private lastClickedPocketSubject = new Subject<number>();
  userBallPocket: any = {};

  constructor(private http: HttpClient) { }

  setLastClickedCueBall(ball: BallModel): void {
    this.lastClickedCueBallSubject.next(ball);
  }

  getDrawPockets() {
    return this.drawPocketsSubject.asObservable();
  }

  setDrawPockets(drawPockets: boolean) {
    this.drawPocketsSubject.next(drawPockets);
  }

  setLastClickedPocket(pocket: number): void {
    this.lastClickedPocketSubject.next(pocket);
  }


  setBall() {
    console.log("zaczynamy");
    this.setLastClickedCueBall(null);
    let that = this;
    let observer = {
      next: (ball) => {
        if (ball != null) {
          that.userBallPocket.ball = ball;
          console.log("ball = " + ball.x + " " + ball.y);
          that.setPocket();
          that.lastClickedCueBallSubject = new Subject<BallModel>();
        }
      }
    }
    this.lastClickedCueBallSubject.asObservable().subscribe(observer);
  }

  setPocket() {
    this.setLastClickedPocket(-1);
    let that = this;
    let observer = {
      next: (pocket) => {
        if (pocket != -1) {
          that.userBallPocket.pocket = pocket;
          console.log("pocket: " + pocket);
          that.sendToServer();
          that.lastClickedPocketSubject = new Subject<number>();
        }
      }
    };
    this.lastClickedPocketSubject.asObservable().subscribe(observer);
  }

  sendToServer(): void {
    this.http.put(`${environment.url}/ball-and-pocket`, this.userBallPocket)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }
}
