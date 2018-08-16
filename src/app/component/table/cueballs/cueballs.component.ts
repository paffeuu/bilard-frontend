import {Component, Input, OnInit} from '@angular/core';
import {Item, Path, Point, Project} from 'paper';
import {ballsConfig, environment, tableConfig} from "../../../../environments/environment";
import {BallModel} from "../../../shared/model/ball.model";

@Component({
  selector: 'app-cueballs',
  templateUrl: './cueballs.component.html',
  styleUrls: ['./cueballs.component.css']
})
export class CueballsComponent implements OnInit {

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
    this.drawAndHighlightCueBalls();
    this.highlightCueBalls();
  }

  drawAndHighlightCueBalls(): void {
    let solids = this.project.activeLayer.children["solids"];     // bile "całe"
    solids.removeChildren();
    let stripes = this.project.activeLayer.children["stripes"];    // bile "połówki"
    stripes.removeChildren();
    let that = this;
    this.cueBalls.forEach((ball) => {
      let circle = new Path.Circle(
        new Point(ball.x * tableConfig.scale, ball.y * tableConfig.scale),
        ballsConfig.radius);
      if (ball.x < tableConfig.width * tableConfig.scale) { // tu warunek dla całych i połówek <-- random
        solids.addChild(circle);
        circle.onMouseMove = function() {    // tu będzie podświetlanie całych
          let solids = that.project.activeLayer.children["solids"];
          solids.children.forEach((circle) => CueballsComponent.setCircleHighlighted(circle, ballsConfig.solidsColor));
        };
        circle.onMouseLeave = function () {
          solids.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        };
      } else {
        stripes.addChild(circle);
        circle.onMouseMove = function () {    // tu będzie podświetlanie połówek
          stripes.children.forEach((circle) => CueballsComponent.setCircleHighlighted(circle, ballsConfig.stripesColor));
        };
        circle.onMouseLeave = function () {
          stripes.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        };
      }
      CueballsComponent.setCircleUnhighlighted(circle);

    })
  }

  highlightCueBalls() {
    let solids = this.project.activeLayer.children["solids"];     // bile "całe"
    let stripes = this.project.activeLayer.children["stripes"];    // bile "połówki"
    switch (this.ballsHighlight)
    {
      case 0:
        solids.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        stripes.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        break;
      case 1:
        solids.children.forEach((circle) => CueballsComponent.setCircleHighlighted(circle, ballsConfig.solidsColor));
        stripes.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        break;
      case 2:
        solids.children.forEach((circle) => CueballsComponent.setCircleUnhighlighted(circle));
        stripes.children.forEach((circle) => CueballsComponent.setCircleHighlighted(circle, ballsConfig.stripesColor));
        break;
      default:
        console.error("Invalid value of variable 'ballsHighlight'");
        console.log(this.ballsHighlight)
    }
  }

  static setCircleHighlighted(circle: Item, color: string) {
    circle.fillColor = color;
    circle.opacity = 0.7;
  }

  static setCircleUnhighlighted(circle: Item) {
    circle.fillColor = "black";
    circle.opacity = 0.1;     // im bliżej 0, tym bardziej nie widać bil
  }
}
