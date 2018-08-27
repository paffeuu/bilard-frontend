import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";
import {PropertiesService} from "../../../shared/service/properties.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  division: number = 0;
  showPrevPos: boolean = false;
  debugActive: boolean = false;

  constructor(private dataService: DataService, private propertiesService: PropertiesService) {
      this.sendChangeShowPrevPositionToService();
      this.sendDebugActiveToService();
  }

  ngOnInit() {
  }

  sendDivisionToService(): void {
    this.dataService.setDivisionLines(this.division);
  }

  sendChangeShowPrevPositionToService(): void {
    this.propertiesService.setShowPreviousPosition(this.showPrevPos);
  }

  sendDebugActiveToService(): void {
    this.propertiesService.setDebugActive(this.debugActive);
  }

}
