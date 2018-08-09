import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  image: any;
  divisionLines: number;
  canvas: any;
  endPoint = 'http://localhost:8090/pooltable/get-snapshot';
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
  public c: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvas = (<HTMLCanvasElement>this.poolTableView.nativeElement);
    this.c = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.src = this.endPoint;

    let that = this;
    this.image.onload = function () {
      that.drawPoolTableImage(that.image);
      that.drawDivisionLines();
    }
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
}
