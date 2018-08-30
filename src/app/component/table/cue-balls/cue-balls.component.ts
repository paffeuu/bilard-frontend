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
    this.highlightCueBalls();
  }

  drawCueBalls(): void {
    let solids = this.project.activeLayer.children["solids"];     // bile "całe"
    solids.removeChildren();
    let stripes = this.project.activeLayer.children["stripes"];    // bile "połówki"
    stripes.removeChildren();
    let that = this;
    if (!this.cueBalls) return;
    this.cueBalls.forEach((ball) => {
      let circle = new Path.Circle(
        new Point(ball.x * this.scale, ball.y * this.scale),
        ballsConfig.radius * this.scale);
      circle.onClick = function () {
        that.ballPocketChooseService.setLastClickedCueBall(ball);
        let hoop = new Path.Circle(circle.position, ballsConfig.hoopRadius);  // obręcz wybranej bili
        hoop.strokeColor = "black";
        hoop.strokeWidth = 5;
        setTimeout(function() {
          hoop.remove();
        }, 3000);
      };
      if (ball.id >= 10 && ball.id <= 29) { // warunek dla "całych"
        solids.addChild(circle);
        circle.onMouseMove = function() {
          let solids = that.project.activeLayer.children["solids"];
          solids.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.solidsColor));
        };
        circle.onMouseLeave = function () {
          solids.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        };
      } else if (ball.id >= 30) {          // warunek dla "połówek"
        stripes.addChild(circle);
        circle.onMouseMove = function () {
          stripes.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.stripesColor));
        };
        circle.onMouseLeave = function () {
          stripes.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        };
      } else {
        circle.remove();
      }
      CueBallsComponent.setCircleUnhighlighted(circle);
    })
  }

  highlightCueBalls() {
    let solids = this.project.activeLayer.children["solids"];     // bile "całe"
    let stripes = this.project.activeLayer.children["stripes"];    // bile "połówki"
    switch (this.ballsHighlight)
    {
      case 0:
        solids.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        stripes.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        break;
      case 1:
        solids.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.solidsColor));
        stripes.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        break;
      case 2:
        solids.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        stripes.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.stripesColor));
        break;
    }
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
      pocketCircle.strokeWidth = 5;
      pocketCircle.strokeColor = "black";
      pocketCircle.fillColor = "yellow";
      pocketCircle.opacity = 0.1;
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
