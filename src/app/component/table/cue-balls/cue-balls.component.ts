import {Component, Input, OnInit} from '@angular/core';
import {Item, Path, Point, Project} from 'paper';
import {ballsConfig, environment, tableConfig} from "../../../../environments/environment";
import {BallModel} from "../../../shared/model/ball.model";

@Component({
  selector: 'app-cueballs',
  templateUrl: './cue-balls.component.html',
  styleUrls: ['./cue-balls.component.css']
})
export class CueBallsComponent implements OnInit {

  constructor() {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.fps);
  }

  ngOnInit() {
  }

  @Input()
  project: Project;
  @Input()
  cueBalls: BallModel[];
  @Input()
  ballsHighlight: number;

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
    this.cueBalls.forEach((ball) => {
      let circle = new Path.Circle(
        new Point(ball.x * tableConfig.scale, ball.y * tableConfig.scale),
        ballsConfig.radius * tableConfig.scale);
      if (ball.id >= 0 && ball.id <= 7) { // // tu warunek dla całych i połówek
        solids.addChild(circle);
        circle.onMouseMove = function() {    // tu będzie podświetlanie całych
          let solids = that.project.activeLayer.children["solids"];
          solids.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.solidsColor));
        };
        circle.onMouseLeave = function () {
          solids.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        };
      } else if (ball.id >= 8 && ball.id <= 15) {
        stripes.addChild(circle);
        circle.onMouseMove = function () {    // tu będzie podświetlanie połówek
          stripes.children.forEach((circle) => CueBallsComponent.setCircleHighlighted(circle, ballsConfig.stripesColor));
        };
        circle.onMouseLeave = function () {
          stripes.children.forEach((circle) => CueBallsComponent.setCircleUnhighlighted(circle));
        };
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
      default:
        console.error("Invalid value of variable 'ballsHighlight'");
        console.log(this.ballsHighlight)
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
}
