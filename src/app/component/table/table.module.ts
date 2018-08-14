import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table.component";
import {PoolTableService} from "../../shared/service/pool.table.service";
import { CueballsComponent } from './cueballs/cueballs.component';
import { DivisionlinesComponent } from './divisionlines/divisionlines.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    CueballsComponent,
    DivisionlinesComponent
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
