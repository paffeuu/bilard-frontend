import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;
  public c: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.c = (<HTMLCanvasElement>this.poolTableView.nativeElement).getContext('2d');
    var image = new Image();
    image.src = 'https://preview.ibb.co/mAZX1K/table_cut01.jpg';

    var that = this;
    image.onload = function () {
      that.c.drawImage(image, 0, 0, 1000, 500);
      that.c.beginPath();
      that.c.moveTo(0, 0);
      that.c.lineTo(100, 100);
      that.c.stroke();
    }
  }
}
