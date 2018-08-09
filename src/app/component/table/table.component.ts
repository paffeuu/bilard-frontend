import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import { PaperScope, /*Path, Point,*/ Project } from 'paper';
import {environment} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {PoolTableModel} from "../../shared/model/pool.table.model";

const tableWidth = 2048;  // rozdzielczość zdjęcia to 2048 x 1536
const tableHeight = 1536;
const tableScale = 0.5;   // skala -> image/source-image
//const radius = 10;
/*const cueBallsDataModel = [
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
];*/  // przykładowy model danych

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  image: any;
  divisionLines: number;
  canvas: any;
  cueBalls: object[];   // tu trzeba przypisać do tablicy jsona z GETa z backendu
  width = tableWidth * tableScale;
  height = tableHeight * tableScale;
  //scope: PaperScope;
  //project: Project;
  endPoint = `${environment.url}/get-snapshot`;
  fps = 4; // Klatki na sekunde
  poolTable: PoolTableModel;

  constructor(private dataService: DataService, private poolTableService: PoolTableService) {
    // setInterval(() => {
    //   this.refreshComponent();
    // }, 1000 / this.fps);
  }

  ngOnInit() {
    this.dataService
      .getDivision()
      .subscribe(response => {
        this.divisionLines = parseInt(response.division);
      }, error => {
        console.error(error);
      });

    this.getPoolTableObject();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;
  public c: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvas = (<HTMLCanvasElement>this.poolTableView.nativeElement);
    this.c = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.src = this.endPoint;
    //this.scope = new PaperScope();
    //this.project = new Project(this.poolTableView.nativeElement);

    let that = this;
    this.image.onload = function () {
      that.drawPoolTableImage(that.image);
      that.drawDivisionLines();
    }

    //this.drawCueBalls();
  }

  drawDivisionLines(): void {
    this.c.beginPath();

    for (let i = 1; i <= this.divisionLines; ++i) {
      let parts = this.divisionLines + 1;
      this.c.moveTo(this.canvas.width / parts * i, 0);
      this.c.lineTo(this.canvas.width / parts * i, this.canvas.height);
    }

    this.c.stroke();
  }

  drawPoolTableImage(image: any): void {
    this.c.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  refreshComponent(): void {
    this.image.src = this.endPoint + '?' + new Date().getTime();
  }

  /*drawCueBalls(): void
  {
    // TO-DO kulki się rozjeżdżają dokładnie jak 'beczkowaty' obraz z kamery
    cueBallsDataModel.forEach((ball) => {
      let x = ball.x * tableScale;
      let y = ball.y * tableScale;
      let center = new Point(x, y);
      let circle = new Path.Circle(center, radius);
      circle.strokeColor = "black";
      circle.fillColor = "black"
      circle.onMouseMove = function(event) {    // tu będzie podświetlanie całych lub połówek
        circle.strokeColor = "red";
        console.log(event.timeStamp);
        console.log(circle.id);
      }
    })
  }*/

  getPoolTableObject(): void {
    this.poolTableService
      .getPoolTableObject()
      .subscribe(response => {
        this.poolTable = response;
        console.log(this.poolTable.balls)
      }, error => {
        console.error(error);
      });
  }
}
