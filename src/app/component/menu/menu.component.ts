import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/service/data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  division: number = 0;
  highlight: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sendDivisionToService();
  }

  sendDivisionToService(): void {
    this.dataService.setDivisionLines(this.division);
  }

  sendHighlightToService(): void {
    this.dataService.setCueBallsHighlight(this.highlight);
  }
}
