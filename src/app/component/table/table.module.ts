import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table.component";
import {PoolTableService} from "../../shared/service/pool.table.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
