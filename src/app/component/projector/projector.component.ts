import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {PaperScope, Point, Project, Raster} from 'paper';
import {tableConfig} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {properties, PropertiesService} from "../../shared/service/properties.service";

@Component({
  selector: 'app-table',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.css']
})
export class ProjectorComponent implements OnInit, AfterViewInit, OnDestroy {
  width: number;
  height: number;
  scale: number;

  image: any;

  scope: PaperScope;
  project: Project;

  poolTableObservable: Observable<any>;
  poolTableObserver: any;

  keyPressListener: EventListener;

  constructor(private dataService: DataService, private poolTableService: PoolTableService,
              private propertiesService: PropertiesService, private router: Router) {}

  ngOnInit() {
    this.poolTableObservable = this.poolTableService.getPoolTableProjector();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {

    this.image = new Image();
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement);

    this.initializeViewSize();
    this.initializePoolTableSubject();
    this.initalizeCanvas();

    this.keyPressListener = (event) => {
      if ((<KeyboardEvent>event).keyCode == 13) {
        this.router.navigate(['']);
      }
      if ((<KeyboardEvent>event).key == 'd') {
        this.propertiesService.setDebugActive(!properties.debugActive);
      }
    };

    window.addEventListener("keypress", this.keyPressListener);
  }

  initializeViewSize(): void {
    this.width = this.scope.view.viewSize.width;
    this.height = this.width * 0.75;
    this.scope.view.viewSize.height = this.height;
    this.scale = this.width / tableConfig.width;
  }

  initalizeCanvas(): void {
    this.initializeRaster();
  }

  initializePoolTableSubject(): void {
    this.poolTableObserver = {
      next: (poolTableObject) => {
        if (poolTableObject) {
          this.image.src = "data:image/jpg;base64," + poolTableObject.tableImage;
        }
      }
    };
    this.poolTableObservable.subscribe(this.poolTableObserver);
  }

  initializeRaster(): void {

    let raster = new Raster({
      image: this.image,
      name: "raster",
      position: new Point(this.width /2, this.height /2 - 149)
    });
    raster.scale(this.scale, this.scale);
    let that = this;
    raster.onError = function() {
      that.poolTableObservable.subscribe(
        (poolTableObject) =>
          that.poolTableObserver.next(poolTableObject));
    };
  }

  ngOnDestroy() {
    window.removeEventListener("keypress", this.keyPressListener);
  }
}
