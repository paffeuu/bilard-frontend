import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  division: number = 0;
  showPrevPos: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  sendDivisionToService(): void {
    this.dataService.setDivisionLines(this.division);
  }

  sendShowPrevPositionToService(): void {
    this.dataService.setShowPrevPosition(this.showPrevPos);
  }

}
