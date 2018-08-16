import {Component, ElementRef, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {DataService} from "../../shared/service/data.service";
import {PaperScope, Point, Project, Raster, Group} from 'paper';
import {environment, tableConfig} from "../../../environments/environment";
import {PoolTableService} from "../../shared/service/pool.table.service";
import {PoolTableModel} from "../../shared/model/pool.table.model";
import {BallModel} from "../../shared/model/ball.model";

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

  tableObject: PoolTableModel;
  cueBalls: BallModel[];

  scope: PaperScope;
  project: Project;

  constructor(private dataService: DataService, private poolTableService: PoolTableService) {
    setInterval(() => {
      this.refreshComponent();

      console.log(this.project.activeLayer.children["raster"]);
    }, 1000 / environment.fps);
  }

  ngOnInit() {
    this.getDivision();
    this.getPoolTableObject();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {

    this.image = new Image();
    let that = this;
    this.image.onerror = function() {
      that.image = new Image();
      that.project.activeLayer.children["raster"].image = that.image;
    }
    this.scope = new PaperScope();
    this.project = new Project(this.poolTableView.nativeElement);

    this.initalizeCanvas();
    this.refreshComponent();
  }

  initalizeCanvas(): void {
    let raster = new Raster({
      image: this.image,
      name: "raster",
      position: new Point(this.width /2, this.height /2)
    });
    raster.scale(tableConfig.scale, tableConfig.scale);

    let solids = new Group();     // bile "całe"
    solids.name = "solids";

    let stripes = new Group();    // bile "połówki"
    stripes.name = "stripes";

    let lines = new Group();
    lines.name = "lines";
  }

  refreshComponent(): void {
    this.getPoolTableObject();
    this.getDivision();
    this.getHighlight();
  }

  getPoolTableObject(): void {
    this.poolTableService
      .getPoolTableObject()
      .subscribe(response => {
        this.tableObject = response;
        this.image.src = "data:image/jpg;base64," + this.tableObject.tableImage;
        this.cueBalls = response.balls;
      }, error => {
        console.error(error);
      });
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
