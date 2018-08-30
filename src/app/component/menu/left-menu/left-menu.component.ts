import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";
import {properties, PropertiesService} from "../../../shared/service/properties.service";
import {BallPocketChooseService} from "../../../shared/service/ball-pocket-choose.service";

const gameModes: string[] = ["live", "wybór bili", "shadow ball"];

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  division: number = 0;
  showPrevPos: boolean = false;
  gameMode: number = 0;
  debugActive: boolean = false;

  constructor(private dataService: DataService, private propertiesService: PropertiesService,
              private ballPocketChooseService: BallPocketChooseService) {
    this.refreshProperties();
  }

  ngOnInit() {
  }

  refreshProperties(): void {
    this.propertiesService.sendAllProperties();
    let that = this;
    setTimeout(function() {
      that.showPrevPos = properties.showPrevPos;
      that.gameMode = properties.gameMode;
      that.debugActive = properties.debugActive;
    }, 500);
  }

  getGameModeName(): string {
    return gameModes[this.gameMode];
  }

  sendDivisionToService(): void {
    this.dataService.setDivisionLines(this.division);
  }

  sendShowPrevPositionToProperties(): void {
    this.propertiesService.setShowPreviousPosition(this.showPrevPos);
  }

  sendGameModeToProperties(): void {
    if (this.gameMode == 1) {
      this.ballPocketChooseService.setBall();
    } else {
      this.propertiesService.setGameMode(this.gameMode);
      this.ballPocketChooseService.setBallAndPocketUndefined();
    }
  }

  sendDebugActiveToProperties(): void {
    this.propertiesService.setDebugActive(this.debugActive);
  }
}
