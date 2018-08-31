import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Item, Path, Point, Project, PaperScope} from 'paper';
import {ballsConfig, environment, pocketConfig, tableConfig} from "../../../../environments/environment";
import {BallModel} from "../../../shared/model/ball.model";
import {BallPocketChooseService} from "../../../shared/service/ball-pocket-choose.service";

@Component({
  selector: 'app-cueballs',
  templateUrl: './cue-balls.component.html',
  styleUrls: ['./cue-balls.component.css']
})
export class CueBallsComponent implements OnInit, OnChanges {

  width: number;
  height: number;
  scale: number;
  project: Project;

  @Input()
  cueBalls: BallModel[];
  @Input()
  ballsHighlight: number;
  @Input()
  scope: PaperScope;

  constructor(private ballPocketChooseService: BallPocketChooseService) {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.refreshFrequency);
  }

  ngOnInit() {
    this.initializeObservablePocketDrawing();
  }

  ngOnChanges() {
    this.initializeViewSize();
  }

  initializeViewSize(): void {
    if (this.scope) {
      this.project = this.scope.project;
      this.width = this.scope.view.viewSize.width;
      this.height = this.width * (tableConfig.height / tableConfig.width);
      this.scale = this.width / tableConfig.width;
    }
  }

  initializeObservablePocketDrawing(): void {
    let drawPocketsObservable = this.ballPocketChooseService.getDrawPockets();
    let that = this;
    let drawPocketsObserver = {
      next: (draw) => {
        if (draw) {
          that.drawPockets();
        } else {
          that.removePockets();
        }
      }
    };
    drawPocketsObservable.subscribe(drawPocketsObserver);
  }

  refreshComponent() {
    this.drawCueBalls();
  }

  drawCueBalls(): void {
    let balls = this.project.activeLayer.children["balls"];     // bile "całe"
    balls.removeChildren();
    let whiteBall = this.project.activeLayer.children["whiteBall"];
    if (whiteBall) {
      whiteBall.remove();
    }
    let that = this;
    if (!this.cueBalls) return;
    this.cueBalls.forEach((ball) => {
      let circle = new Path.Circle(
        new Point(ball.x * this.scale, ball.y * this.scale),
        ballsConfig.radius * this.scale);
      if (ball.id > 0) {
        balls.addChild(circle);
        circle.onMouseMove = function() {
          CueBallsComponent.setCircleHighlighted(circle, ballsConfig.color);
        };
        circle.onMouseLeave = function () {
          CueBallsComponent.setCircleUnhighlighted(circle);
        };
      } else if (ball.id == 0) {          // warunek dla "połówek"
        circle.name = "whiteBall";
        circle.onMouseMove = function () {
          CueBallsComponent.setCircleHighlighted(circle, ballsConfig.whiteColor);
        };
        circle.onMouseLeave = function () {
          CueBallsComponent.setCircleUnhighlighted(circle);
        };
      }
      circle.onClick = function () {
        if (circle.name != "whiteBall") {
          that.ballPocketChooseService.setLastClickedCueBall(ball);
          let hoop = new Path.Circle(circle.position, ballsConfig.hoopRadius);  // obręcz wybranej bili
          hoop.strokeColor = ballsConfig.hoopStrokeColor;
          hoop.strokeWidth = ballsConfig.hoopStrokeWidth;
          setTimeout(function() {
            hoop.remove();
          }, 3000);
        }
      };
      CueBallsComponent.setCircleUnhighlighted(circle);
    })
  }

  static setCircleHighlighted(circle: Item, color: string) {
    circle.fillColor = color;
    circle.opacity = 0.9;
  }

  static setCircleUnhighlighted(circle: Item) {
    circle.fillColor = "black";
    circle.opacity = 0.1;     // im bliżej 0, tym bardziej nie widać bil
  }

  drawPockets(): void {
    let pockets = this.project.activeLayer.children["pockets"];
    let that = this;
    pocketConfig.pocketModel.forEach((pocket) => {
      let pocketCircle = new Path.Circle(new Point(pocket.centerX * this.scale, pocket.centerY * this.scale), pocketConfig.hoopRadius);
      pocketCircle.strokeWidth = pocketConfig.hoopStrokeWidth;
      pocketCircle.strokeColor = pocketConfig.hoopStrokeColor;
      pocketCircle.fillColor = pocketConfig.hoopFillColor;
      pocketCircle.opacity = pocketConfig.hoopOpacity;
      pockets.addChild(pocketCircle);
      pocketCircle.onClick = function () {
        that.ballPocketChooseService.setLastClickedPocket(pocket.id);
      }
    });
  }

  removePockets(): void {
    this.project.activeLayer.children["pockets"].removeChildren();
  }
}
