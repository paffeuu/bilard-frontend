import {Component, Input, OnInit} from '@angular/core';
import {Path, Point, Project, PaperScope} from 'paper';
import {environment, linesConfig, tableConfig} from "../../../../environments/environment";

@Component({
  selector: 'app-divisionlines',
  templateUrl: './division-lines.component.html',
  styleUrls: ['./division-lines.component.css']
})
export class DivisionLinesComponent implements OnInit {

  width: number;
  height: number;

  @Input()
  project: Project;
  @Input()
  scope: PaperScope;
  @Input()
  divisionLines: number;
  @Input()
  scale: number;

  constructor() {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.fps);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.initializeViewSize();
  }

  initializeViewSize(): void {
    this.width = this.scope.view.viewSize.width;
    this.height = this.width * 0.75;
    this.scope.view.viewSize.height = this.height;
    this.scale = this.width / tableConfig.width;
  }

  refreshComponent() {
    this.drawDivisionLines();
  }

  drawDivisionLines(): void {
    let lines = this.project.activeLayer.children["lines"];
    lines.removeChildren();
    for (let i = 1; i <= this.divisionLines; ++i) {
      let line = new Path.Line(new Point(this.width / (this.divisionLines + 1) * i, 0),
        new Point(this.width / (this.divisionLines + 1) * i, this.height));
      line.strokeColor = linesConfig.lineColor;
      lines.addChild(line);
    }
    lines.bringToFront();
  }
}
