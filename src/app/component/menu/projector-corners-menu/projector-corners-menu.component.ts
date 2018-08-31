import { Component, OnInit } from '@angular/core';
import {properties, PropertiesService} from "../../../shared/service/properties.service";
import {PointModel} from "../../../shared/model/point.model";

@Component({
  selector: 'app-projector-corners-menu',
  templateUrl: './projector-corners-menu.component.html',
  styleUrls: [
    './projector-corners-menu.component.css',
    '.././menu.module.css']
})
export class ProjectorCornersMenuComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) { }

  projectorLeftTopCorner: any = new PointModel();
  projectorRightTopCorner: any = new PointModel();
  projectorRightBottomCorner: any = new PointModel();
  projectorLeftBottomCorner: any = new PointModel();

  ngOnInit() {
    this.refreshProperties();
  }

  refreshProperties(): void {
    let that = this;
    setTimeout(function() {
      if (properties.projectorLeftTopCorner) {
        that.projectorLeftTopCorner = properties.projectorLeftTopCorner;
      }
      if (properties.projectorRightTopCorner) {
        that.projectorRightTopCorner = properties.projectorRightTopCorner;
      }
      if (properties.projectorRightBottomCorner) {
        that.projectorRightBottomCorner = properties.projectorRightBottomCorner;
      }
      if (properties.projectorLeftBottomCorner) {
        that.projectorLeftBottomCorner = properties.projectorLeftBottomCorner;
      }
    }, 400);
  }

  sendProjectorLeftTopCornerToProperties(): void {
    this.propertiesService.setProjectorLeftTopCorner(this.projectorLeftTopCorner);
  }

  sendProjectorRightTopCornerToProperties(): void {
    this.propertiesService.setProjectorRightTopCorner(this.projectorRightTopCorner);
  }

  sendProjectorRightBottomCornerToProperties(): void {
    this.propertiesService.setProjectorRightBottomCorner(this.projectorRightBottomCorner);
  }

  sendProjectorLeftBottomCornerToProperties(): void {
    this.propertiesService.setProjectorLeftBottomCorner(this.projectorLeftBottomCorner);
  }
}
