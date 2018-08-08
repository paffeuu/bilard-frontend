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

  constructor(private dataService: DataService) {
    setInterval(() => {
      this.refreshComponent();
    }, 500);
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
    this.image.src = 'http://localhost:8090/pooltable/get-snapshot';

    let that = this;
    this.image.onload = function () {
      that.drawPoolTableImage(that.image);
    }
  }

  drawDivisionLines(lines: number): void {
    for (let i = 1; i <= lines; ++i) {
      let parts = lines + 1;
      this.c.moveTo(this.canvas.width / parts * i, 0);
      this.c.lineTo(this.canvas.width / parts * i, this.canvas.height);
    }

    this.c.stroke();
  }

  drawPoolTableImage(image): void {
    this.c.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    this.drawDivisionLines(this.divisionLines);
  }

  refreshComponent(): void {
    this.image.src = 'http://localhost:8090/pooltable/get-snapshot?' + new Date().getTime();

    this.c.beginPath();
    this.c.clearRect(0, 0, 1000, 500);
    this.drawPoolTableImage(this.image);
  }
}
