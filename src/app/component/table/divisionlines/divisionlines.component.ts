import {Component, Input, OnInit} from '@angular/core';
import {Group, Path, Point, Project} from 'paper';
import {environment, linesConfig, tableConfig} from "../../../../environments/environment";

@Component({
  selector: 'app-divisionlines',
  templateUrl: './divisionlines.component.html',
  styleUrls: ['./divisionlines.component.css']
})
export class DivisionlinesComponent implements OnInit {

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
  divisionLines: number;

  width = tableConfig.width * tableConfig.scale;
  height = tableConfig.height * tableConfig.scale;

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
  }
}
