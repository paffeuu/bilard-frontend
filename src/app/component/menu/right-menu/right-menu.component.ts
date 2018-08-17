import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css']
})
export class RightMenuComponent implements OnInit {
  highlight: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  sendHighlightToService(): void {
    this.dataService.setCueBallsHighlight(this.highlight);
  }

}
