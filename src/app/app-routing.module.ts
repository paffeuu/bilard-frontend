import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {TableComponent} from "./component/table/table.component";
import {ProjectorComponentComponent} from "./component/table/projector-component/projector-component.component";

const routes: Routes = [
  {path: '', component: ProjectorComponentComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
