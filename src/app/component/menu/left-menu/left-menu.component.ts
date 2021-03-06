import { Component} from '@angular/core';
import {DataService} from "../../../shared/service/data.service";
import {properties, PropertiesService} from "../../../shared/service/properties.service";
import {BallPocketChooseService} from "../../../shared/service/ball-pocket-choose.service";

const gameModes: string[] = ["live", "wybór bili", "shadow ball"];

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: [
    './left-menu.component.css',
    '.././menu.module.css']
})
export class LeftMenuComponent {
  division: number = 0;
  gameMode: number = 0;
  debugActive: boolean = false;

  constructor(private dataService: DataService, private propertiesService: PropertiesService,
              private ballPocketChooseService: BallPocketChooseService) {
    this.refreshProperties();
  }

  refreshProperties(): void {
    let that = this;
    setTimeout(function() {
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

  sendGameModeToProperties(): void {
    if (this.gameMode == 0) {
      this.ballPocketChooseService.setMode(false);
      this.ballPocketChooseService.setBallAndPocketUndefined();
    } else {
      this.ballPocketChooseService.setMode(true);
      this.ballPocketChooseService.setBall();
    }
    this.propertiesService.setGameMode(this.gameMode);
  }

  sendDebugActiveToProperties(): void {
    this.propertiesService.setDebugActive(this.debugActive);
  }
}
