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

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;
  public c: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.c = (<HTMLCanvasElement>this.poolTableView.nativeElement).getContext('2d');
    this.image = new Image();
    this.image.src = 'https://preview.ibb.co/mAZX1K/table_cut01.jpg';

    var that = this;
    this.image.onload = function()  {
      that.drawPoolTableImage(that.image);
    }
  }

  drawDivisionLines(): void {
    this.c.beginPath();
    this.c.clearRect(0, 0, 1000, 500);
    this.drawPoolTableImage(this.image);

    var width = 1000;
    var height = 500;

    for (var i = 1; i <= this.dataService.division; ++i) {
      var parts = parseInt(String(this.dataService.division)) + 1;
      this.c.moveTo(width / parts * i, 0);
      this.c.lineTo(width / parts * i, height);
    }

    this.c.stroke();
  }

  drawPoolTableImage(image): void {
    this.c.drawImage(image, 0, 0, 1000, 500);
  }
}
