import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {PaperScope, Point, Project, Raster, Group} from 'paper';
import {environment, tableConfig} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {BallModel} from "../../shared/model/ball.model";
import {PoolTableModel} from "../../shared/model/pool.table.model";
import {PreviousPositionService} from "../../shared/service/previous-position.service";
import {Observable, Subject} from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  width = tableConfig.width * tableConfig.scale;
  height = tableConfig.height * tableConfig.scale;
  image: any;
  divisionLines: number = 0;
  ballsHighlight: number = 0;
  showPrevPos: boolean = false;

  cueBalls: BallModel[];

  scope: PaperScope;
  project: Project;

  poolTableObservable: Observable<any>;

  constructor(private dataService: DataService, private poolTableService: PoolTableService,
              private prevPosService: PreviousPositionService) {
    setInterval(() => {
      this.refreshComponent();

      console.log(this.project.activeLayer.children["raster"]);
    }, 1000 / environment.fps);
  }

  ngOnInit() {
    this.getDivision();
    this.poolTableObservable = this.poolTableService.getPoolTable();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {

    this.image = new Image();
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement);

    //this.initializeWebSocket();
    this.initializePoolTableSubject();
    this.initalizeCanvas();
    this.refreshComponent();
  }

  initalizeCanvas(): void {
    this.initializeRaster();

    let solids = new Group();     // bile "całe"
    solids.name = "solids";

    let stripes = new Group();    // bile "połówki"
    stripes.name = "stripes";

    let lines = new Group();
    lines.name = "lines";
  }

  initializePoolTableSubject(): void {
    let observer = {
      next: (poolTableObject) => {
        console.log("elo mordo mam wiadomosc");
        if (poolTableObject)
        {
          console.log("oto ona:")
          console.log(poolTableObject);
          this.image.src = "data:image/jpg;base64," + poolTableObject.tableImage;
          this.cueBalls = poolTableObject.balls;
        }
      }
    };
    this.poolTableObservable.subscribe(observer);
  }

  /*initializeWebSocket(): void {
    this.poolTableObservable = this.webSocketService.connect();
    console.log(this.poolTableObservable);
    let observer = {
      next: (message) => {
        console.log("elo mordo mam wiadomosc");
        let poolTableObject = JSON.parse(message.body);
        console.log("oto ona:")
        console.log(poolTableObject);
        this.image.src = "data:image/jpg;base64," + poolTableObject.tableImage;
        this.cueBalls = poolTableObject.balls;
      }
    };
    this.poolTableObservable.subscribe(observer);
  }*/

  initializeRaster(): void {

    let raster = new Raster({
      image: this.image,
      name: "raster",
      position: new Point(this.width /2, this.height /2)
    });
    raster.scale(tableConfig.scale, tableConfig.scale);
    let that = this;
    /*raster.onError = function() {
      let lastPoolTable = that.poolTableService.getLastPoolTable();
      if (lastPoolTable != null)
        that.image.src = "data:image/jpg;base64," + lastPoolTable.tableImage;
      that.image = new Image();
      raster.image = that.image;
    }*/
  }

  refreshComponent(): void {
    //this.getPoolTableObject();
    this.getDivision();
    this.getHighlight();
    this.getShowPrevPosition();
  }

  /*getPoolTableObject(): PoolTableModel {
    let poolTableObject = this.poolTableService.getLastPoolTable();
    console.log(poolTableObject);
    if (poolTableObject != null)
    {
      this.image.src = "data:image/jpg;base64," + poolTableObject.tableImage;
      this.cueBalls = poolTableObject.balls;
    }
    return poolTableObject;
  }*/

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

  getShowPrevPosition(): void {
    this.dataService
      .getShowPrevPosition().subscribe(
        response => {
          if (this.showPrevPos != response)
          {
            this.showPrevPos = response;
            this.prevPosService.setShowPrevPosition();
          }
        },
        error => console.log(error));
  }


}
