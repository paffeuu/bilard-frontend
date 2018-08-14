import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table.component";
import { CueballsComponent } from './cueballs/cueballs.component';
import { DivisionlinesComponent } from './divisionlines/divisionlines.component';
import {SliderModule} from "primeng/slider";

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
