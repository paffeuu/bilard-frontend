import { Component, OnInit } from '@angular/core';
import {PointModel} from "../../../shared/model/point.model";
import {properties, PropertiesService} from "../../../shared/service/properties.service";

@Component({
  selector: 'app-projector-config-menu',
  templateUrl: './projector-config-menu.component.html',
  styleUrls: [
    './projector-config-menu.component.css',
    '.././menu.module.css']
})
export class ProjectorConfigMenuComponent implements OnInit {
  leftTopCorrection: any = new PointModel();
  leftBottomCorrection: any = new PointModel();
  rightTopCorrection: any = new PointModel();
  rightBottomCorrection: any = new PointModel();
  centerCorrection: any = new PointModel();

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.refreshProperties();
  }

  refreshProperties(): void {
    let that = this;
    setTimeout(function() {
      if (properties.leftTopCorrection) {
        that.leftTopCorrection = properties.leftTopCorrection;
      }
      if (properties.leftBottomCorrection) {
        that.leftBottomCorrection = properties.leftBottomCorrection;
      }
      if (properties.rightTopCorrection) {
        that.rightTopCorrection = properties.rightTopCorrection;
      }
      if (properties.rightBottomCorrection) {
        that.rightBottomCorrection = properties.rightBottomCorrection;
      }
      if (properties.centerCorrection) {
        that.centerCorrection = properties.center;
      }
    }, 400);
  }

  sendLeftTopCorrectionToProperties(): void {
    this.propertiesService.setLeftTopCorrection(this.leftTopCorrection);
  }

  sendLeftBottomCorrectionToProperties(): void {
    this.propertiesService.setLeftBottomCorrection(this.leftBottomCorrection);
  }

  sendRightTopCorrectionToProperties(): void {
    this.propertiesService.setRightTopCorrection(this.rightTopCorrection);
  }

  sendRightBottomCorrectionToProperties(): void {
    this.propertiesService.setRightBottomCorrection(this.rightBottomCorrection);
  }

  sendCenterCorrectionToProperties(): void {
    this.propertiesService.setCenterCorrection(this.centerCorrection);
  }

}
