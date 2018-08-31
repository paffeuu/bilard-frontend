import { Component, OnInit } from '@angular/core';
import {properties, PropertiesService} from "../../../shared/service/properties.service";

@Component({
  selector: 'app-projector-corners-menu',
  templateUrl: './projector-corners-menu.component.html',
  styleUrls: [
    './projector-corners-menu.component.css',
    '.././menu.module.css']
})
export class ProjectorCornersMenuComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) { }

  projectorLeftTopCorner: any = ProjectorCornersMenuComponent.Point();
  projectorRightTopCorner: any = ProjectorCornersMenuComponent.Point();
  projectorRightBottomCorner: any = ProjectorCornersMenuComponent.Point();
  projectorLeftBottomCorner: any = ProjectorCornersMenuComponent.Point();

  ngOnInit() {
    this.refreshProperties();
  }

  refreshProperties(): void {
    let that = this;
    setTimeout(function() {
      that.projectorLeftTopCorner = properties.projectorLeftTopCorner;
      that.projectorRightTopCorner = properties.projectorRightTopCorner;
      that.projectorRightBottomCorner = properties.projectorRightBottomCorner;
      that.projectorLeftBottomCorner = properties.projectorLeftBottomCorner;
    }, 200);
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

  static Point() {
    return {x: 0, y: 0};
  }
}

