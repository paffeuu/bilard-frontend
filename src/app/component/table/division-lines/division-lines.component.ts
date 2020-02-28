import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Path, Point, Project, PaperScope} from 'paper';
import {environment, linesConfig, tableConfig} from "../../../../environments/environment";

@Component({
  selector: 'app-divisionlines',
  templateUrl: './division-lines.component.html',
  styleUrls: ['./division-lines.component.css']
})
export class DivisionLinesComponent implements OnInit, OnChanges {

  width: number;
  height: number;
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
    }, 1000 / environment.refreshFrequency);
  }

  ngOnInit() {
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
