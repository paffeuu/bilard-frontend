import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import { PaperScope, Path, Point, Project, Raster, Group, Item } from 'paper';
import {environment} from "../../../environments/environment";

const tableWidth = 2048;  // rozdzielczość zdjęcia to 2048 x 1536
const tableHeight = 1536;
const tableScale = 0.5;   // skala -> image/source-image
const radius = 10;
const cueBallsDataModel = [
  {i: 0, x: 1122.5, y: 1085.5},
  {i: 1, x: 1088.5, y: 713.5},
  {i: 2, x: 880.5, y: 503.5},
  {i: 3, x: 1182.5, y: 438.5},
  {i: 4, x: 1910.5, y: 1159.5},
  {i: 5, x: 1358.5, y: 742.5},
  {i: 6, x: 1323.5, y: 483.5},
  {i: 7, x: 1571.5, y: 998.5},
  {i: 8, x: 1420.5, y: 714.5},
  {i: 9, x: 1603.5, y: 1029.5},
  {i: 10, x: 1537.5, y: 985.5},
  {i: 11, x: 1896.5, y: 394.5},
  {i: 12, x: 1623.5, y: 536.5},
  {i: 13, x: 1196.5, y: 1009.5},
  {i: 14, x: 1758.5, y: 613.5},
  {i: 15, x: 1749.5, y: 895.5},
  {i: 16, x: 1754.5, y: 857.5},
  {i: 17, x: 144.5, y: 112.5},
  {i: 18, x: 259.5, y: 107.5}
];  // przykładowy model danych

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  image: any;
  divisionLines: number;
  cueBalls: object[];   // tu trzeba przypisać do tablicy jsona z GETa z backendu
  width = tableWidth * tableScale;
  height = tableHeight * tableScale;
  scope: PaperScope;
  project: Project;
  endPoint = `${environment.url}/get-snapshot`;
  fps = 4; // Klatki na sekunde

  constructor(private dataService: DataService) {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / this.fps);
  }

  ngOnInit() {
    this.dataService
      .getDivision()
      .subscribe(response => {
        this.divisionLines = parseInt(response.division);
      }, error => {
        console.error(error);
      });
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {
    this.image = new Image();
    //this.image.src = this.endPoint;
    this.image.src = "https://preview.ibb.co/hSXgy9/bilard2.jpg";
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement);

    let that = this;
    this.image.onload = function () {
      let raster = new Raster(this.image);
      raster.name = "raster";
      that.drawPoolTableImage();
      that.drawDivisionLines();
    }
    this.drawCueBalls();
  }

  drawDivisionLines(): void {
    let lines = new Group();
    lines.name = "lines";
    for (let i = 1; i <= this.divisionLines; ++i) {
      let line = new Path.Line(new Point(this.width / (this.divisionLines + 1) * i, 0),
        new Point(this.width / (this.divisionLines + 1) * i, this.height));
      line.strokeColor = "black";
      lines.addChild(line);
    }
  }

  drawPoolTableImage(): void {
    let raster = this.project.activeLayer.children["raster"];
    raster.image = this.image;
    raster.width = this.width;
    raster.height = this.height;
    raster.position = new Point(this.width /2, this.height /2);
  }

  drawCueBalls(): void {
    // TO-DO kulki się rozjeżdżają dokładnie jak 'beczkowaty' obraz z kamery - problem z image distortion
    let solids = new Group();     // bile "całe"
    solids.name = "solids";
    let stripes = new Group();    // bile "połówki"
    stripes.name = "stripes";
    let that = this;
    cueBallsDataModel.forEach((ball) => {
      let circle = new Path.Circle(new Point(ball.x * tableScale, ball.y * tableScale), radius);
      if (ball.i % 2 == 0) { // tu warunek dla całych i połówek <-- random
        solids.addChild(circle);
        circle.onMouseMove = function() {    // tu będzie podświetlanie całych lub połówek
          let solids = this.project.activeLayer.children["solids"];
          solids.children.forEach((circle) => that.setCircleHighlighted(circle, "red"));
        };
        circle.onMouseLeave = function () {
          solids.children.forEach((circle) => that.setCircleUnhighlighted(circle));
        }
      } else {
        stripes.addChild(circle);
        circle.onMouseMove = function () {    // tu będzie podświetlanie całych lub połówek
          stripes.children.forEach((circle) => that.setCircleHighlighted(circle, "white"));
        }
        circle.onMouseLeave = function () {
          stripes.children.forEach((circle) => that.setCircleUnhighlighted(circle));
        }
      }
      this.setCircleUnhighlighted(circle);
    })
  }

  setCircleHighlighted(circle: Item, color: string) {
    circle.fillColor = color;
    circle.opacity = 0.7;
  }

  setCircleUnhighlighted(circle: Item) {
    circle.fillColor = "black";
    circle.opacity = 0.1;     // im bliżej 0, tym bardziej nie widać bil
  }

  refreshComponent(): void {
    let solids = this.project.activeLayer.children["solids"];
    let stripes = this.project.activeLayer.children["stripes"];
    solids.bringToFront();
    stripes.bringToFront();
    //this.image.src = this.endPoint + '?' + new Date().getTime();
    this.drawPoolTableImage();
    this.project.activeLayer.children["lines"].remove();
    this.drawDivisionLines();
    let lines = this.project.activeLayer.children["lines"];
    lines.bringToFront();
  }
}
