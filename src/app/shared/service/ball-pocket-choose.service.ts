import { Injectable } from '@angular/core';
import {BallModel} from "../model/ball.model";
import {Subject, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PropertiesService} from "./properties.service";

@Injectable({
  providedIn: 'root'
})
export class BallPocketChooseService {

  private lastClickedCueBallSubject = new Subject<BallModel>();
  private drawPocketsSubject = new Subject<any>();
  private lastClickedPocketSubject = new Subject<number>();
  ballSubscription: Subscription;
  pocketSubscription: Subscription;
  userBallPocket: any = {};

  constructor(private http: HttpClient, private propertiesService: PropertiesService) { }

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
          this.ballSubscription.unsubscribe();
        }
      }
    };
    this.ballSubscription = this.lastClickedCueBallSubject.asObservable().subscribe(observer);
  }

  setPocket() {
    console.log("elo mordo");
    this.setLastClickedPocket(-1);
    this.setDrawPockets(true);
    let that = this;
    let observer = {
      next: (pocket) => {
        if (pocket != -1) {
          that.userBallPocket.pocket = pocket;
          console.log("pocket: " + pocket);
          that.sendToServer();
          that.propertiesService.setGameMode(1);
          this.pocketSubscription.unsubscribe();
          that.setDrawPockets(false);
        }
      }
    };
    this.pocketSubscription = this.lastClickedPocketSubject.asObservable().subscribe(observer);
  }

  setBallAndPocketUndefined(): void {
    this.ballSubscription.unsubscribe();
    this.pocketSubscription.unsubscribe();
  }

  sendToServer(): void {
    this.http.put(`${environment.url}/ball-and-pocket`, this.userBallPocket)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }
}
