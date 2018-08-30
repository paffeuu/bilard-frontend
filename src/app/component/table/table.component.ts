import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {PaperScope, Point, Project, Raster, Group} from 'paper';
import {environment, tableConfig} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {BallModel} from "../../shared/model/ball.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  constructor(private dataService: DataService, private poolTableService: PoolTableService,
              private changeDetectorRef: ChangeDetectorRef) {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.refreshFrequency);
  }

  width: number;
  height: number;
  scale: number;

  image: any;
  divisionLines: number = 0;
  ballsHighlight: number = 0;

  cueBalls: BallModel[];

  scope: PaperScope;
  project: Project;

  poolTableObservable: Observable<any>;
  poolTableObserver: any;

  @ViewChild('poolTableView')
  poolTableView: ElementRef;

  ngOnInit() {
    this.getDivision();
    this.poolTableObservable = this.poolTableService.getPoolTableNormal();
  }

  ngAfterViewInit(): void {
    this.image = new Image();
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement);
    this.changeDetectorRef.detectChanges();

    this.initializeViewSize();
    this.initializePoolTableSubject();
    this.initalizeCanvas();
    this.refreshComponent();
  }

  initializeViewSize(): void {
    this.width = this.scope.view.viewSize.width;
    this.height = this.width * (tableConfig.height / tableConfig.width);
    this.scope.view.viewSize.height = this.height;
    this.scale = this.width / tableConfig.width;
  }

  initalizeCanvas(): void {
    this.initializeRaster();

    new Group({name: "solids"});     // bile "całe"
    new Group({name: "stripes"});    // bile "połówki"
    new Group({name: "lines"});
    new Group({name: "pockets"});
  }

  initializePoolTableSubject(): void {
    this.poolTableObserver = {
      next: (poolTableObject) => {
        if (poolTableObject)
        {
          this.image.src = "data:image/jpg;base64," + poolTableObject.tableImage;
          this.cueBalls = poolTableObject.balls;
        }
      }
    };
    this.poolTableObservable.subscribe(this.poolTableObserver);
  }

  initializeRaster(): void {
    let raster = new Raster({
      image: this.image,
      name: "raster",
      position: new Point(this.width /2, this.height /2)
    });
    raster.scale(this.scale, this.scale);
    let that = this;
    raster.onError = function() {
      that.poolTableObservable.subscribe(
        (poolTableObject) =>
          that.poolTableObserver.next(poolTableObject));
    };
  }

  refreshComponent(): void {
    this.getDivision();
    this.getHighlight();
  }

  getDivision(): void {
    this.dataService
      .getDivisionLines()
      .subscribe(response => {
        this.divisionLines = parseInt(response.division);
      }, error => {
        console.error(error);
      });
  }

  getHighlight(): void {
    this.dataService
      .getCueBallsHighlight()
      .subscribe(response => {
        this.ballsHighlight = parseInt(response.highlight);
      }, error => {
      console.error(error);
    });
  }
}
