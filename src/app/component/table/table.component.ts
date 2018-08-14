import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {PaperScope, Path, Point, Project, Raster, Group, Item} from 'paper';
import {environment} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {PoolTableModel} from "../../shared/model/pool.table.model";
import {BallModel} from "../../shared/model/ball.model";

const tableWidth = 2048;  // rozdzielczość zdjęcia to 2048 x 1536
const tableHeight = 1536;
const tableScale = 0.5;   // skala -> image/source-image
const radius = 10;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  image: any;
  divisionLines: number;
  width = tableWidth * tableScale;
  height = tableHeight * tableScale;
  scope: PaperScope;
  project: Project;
  tableObject: PoolTableModel;
  cueBalls: BallModel[];



  constructor(private dataService: DataService, private poolTableService: PoolTableService) {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.fps);
  }

  ngOnInit() {
    this.getDivision();
    this.getPoolTableObject();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {
    this.image = new Image();
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement)

    this.initalizeCanvas();
    this.refreshComponent();
  }

  initalizeCanvas(): void {

    let raster = new Raster({
      image: this.image,
      name: "raster",
      position: new Point(this.width /2, this.height /2)
    });
    raster.scale(tableScale, tableScale);

    let lines = new Group();
    lines.name = "lines";

    let solids = new Group();     // bile "całe"
    solids.name = "solids";

    let stripes = new Group();    // bile "połówki"
    stripes.name = "stripes";
  }

  getDivision(): void {
    this.dataService
      .getDivision()
      .subscribe(response => {
        this.divisionLines = parseInt(response.division);
      }, error => {
        console.error(error);
      });
  }

  drawDivisionLines(): void {
    let lines = this.project.activeLayer.children["lines"];
    lines.removeChildren();
    for (let i = 1; i <= this.divisionLines; ++i) {
      let line = new Path.Line(new Point(this.width / (this.divisionLines + 1) * i, 0),
        new Point(this.width / (this.divisionLines + 1) * i, this.height));
      line.strokeColor = "black";
      lines.addChild(line);
    }
  }

  refreshComponent(): void {
    this.getPoolTableObject();
    this.drawCueBalls();
    this.getDivision();
    this.drawDivisionLines();
  }

  drawCueBalls(): void {
    let solids = this.project.activeLayer.children["solids"];     // bile "całe"
    solids.removeChildren();
    let stripes = this.project.activeLayer.children["stripes"];    // bile "połówki"
    stripes.removeChildren();
    let that = this;
    console.log(this.cueBalls);
    this.cueBalls.forEach((ball) => {
      let circle = new Path.Circle(new Point(ball.x * tableScale, ball.y * tableScale), radius);
      if (ball.id % 2 == 0) { // tu warunek dla całych i połówek <-- random
        solids.addChild(circle);
        circle.onMouseMove = function() {    // tu będzie podświetlanie całych
          let solids = this.project.activeLayer.children["solids"];
          solids.children.forEach((circle) => that.setCircleHighlighted(circle, "red"));
        };
        circle.onMouseLeave = function () {
          solids.children.forEach((circle) => that.setCircleUnhighlighted(circle));
        }
      } else {
        stripes.addChild(circle);
        circle.onMouseMove = function () {    // tu będzie podświetlanie połówek
          stripes.children.forEach((circle) => that.setCircleHighlighted(circle, "white"));
        }
        circle.onMouseLeave = function () {
          stripes.children.forEach((circle) => that.setCircleUnhighlighted(circle));
        }
      }
      this.setCircleUnhighlighted(circle);
    })
  }

  getPoolTableObject(): void {
    this.poolTableService
      .getPoolTableObject()
      .subscribe(response => {
        this.tableObject = response;
        this.image.src = "data:image/jpg;base64," + this.tableObject.tableImage;
        this.cueBalls = response.balls;
      }, error => {
        console.error(error);
      });
  }

  setCircleHighlighted(circle: Item, color: string) {
    circle.fillColor = color;
    circle.opacity = 0.7;
  }

  setCircleUnhighlighted(circle: Item) {
    circle.fillColor = "black";
    circle.opacity = 0.1;     // im bliżej 0, tym bardziej nie widać bil
  }

}
