import { Injectable } from '@angular/core';
import {BallModel} from "../model/ball.model";
import {Subject, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BallPocketChooseService {

  modeOn: boolean = false;
  lastClickedCueBallSubject = new Subject<BallModel>();
  drawPocketsSubject = new Subject<any>();
  lastClickedPocketSubject = new Subject<number>();
  ballSubscription: Subscription;
  pocketSubscription: Subscription;
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

  setMode(mode) {
    this.modeOn = mode;
  }

  setBall() {
    this.setLastClickedCueBall(null);
    let that = this;
    let observer = {
      next: (ball) => {
        if (this.modeOn && ball != null) {
          that.ballSubscription.unsubscribe();
          that.userBallPocket.ball = ball;
          that.setPocket();
        }
      }
    };
    this.ballSubscription = this.lastClickedCueBallSubject.asObservable().subscribe(observer);
  }

  setPocket() {
    this.setLastClickedPocket(-1);
    this.setDrawPockets(true);
    let that = this;
    let observer = {
      next: (pocket) => {
        if (this.modeOn && pocket != -1) {
          that.pocketSubscription.unsubscribe();
          that.userBallPocket.pocket = pocket;
          that.sendToServer();
          that.setDrawPockets(false);
          if (this.modeOn) {
            this.setBall();
          }
        }
      }
    };
    this.pocketSubscription = this.lastClickedPocketSubject.asObservable().subscribe(observer);
  }

  setBallAndPocketUndefined(): void {
    if (this.ballSubscription) {
      this.ballSubscription.unsubscribe();
    }
    if (this.pocketSubscription) {
      this.pocketSubscription.unsubscribe();
    }
  }

  sendToServer(): void {
    this.http.put(`${environment.url}/ball-and-pocket`, this.userBallPocket).subscribe(
      () => {}, error => console.log(error));
  }
}
