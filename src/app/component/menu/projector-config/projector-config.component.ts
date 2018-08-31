import { Component, OnInit } from '@angular/core';
import {properties, PropertiesService} from "../../../shared/service/properties.service";

@Component({
  selector: 'app-projector-config',
  templateUrl: './projector-config.component.html',
  styleUrls: ['./projector-config.component.css']
})
export class ProjectorConfigComponent implements OnInit {

  constructor(private propertiesService: PropertiesService) { }

  projectorLeftTopCorner: any;
  projectorRightTopCorner: any;
  projectorRightBottomCorner: any;
  projectorLeftBottomCorner: any;

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

}
