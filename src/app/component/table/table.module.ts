import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./table.component";
import { CueBallsComponent } from './cue-balls/cue-balls.component';
import { DivisionLinesComponent } from './division-lines/division-lines.component';
import {SliderModule} from "primeng/slider";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    CueBallsComponent,
    DivisionLinesComponent
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
