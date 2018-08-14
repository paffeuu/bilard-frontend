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
  divisionLines: number;

  tableObject: PoolTableModel;
  cueBalls: BallModel[];

  scope: PaperScope;
  project: Project;

  constructor(private dataService: DataService, private poolTableService: PoolTableService) {
    setInterval(() => {
      this.refreshComponent();
    }, 1000 / environment.fps);
  }

  ngOnInit() {
    this.getDivision();
    this.getPoolTableObject();
  }

  @ViewChild('poolTableView') poolTableView: ElementRef;

  ngAfterViewInit(): void {
    this.image = new Image();
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

  getDivision(): void {
    this.dataService
      .getDivision()
      .subscribe(response => {
        this.divisionLines = parseInt(response.division);
      }, error => {
        console.error(error);
      });
  }


  refreshComponent(): void {
    this.getPoolTableObject();
    this.getDivision();
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


}
