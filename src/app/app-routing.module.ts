import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {NormalViewComponent} from "./normal-view.component";
import {ProjectorComponent} from "./component/projector/projector.component";

const routes: Routes = [
  {path: '', component: NormalViewComponent},
  {path: 'projector', component: ProjectorComponent}
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
