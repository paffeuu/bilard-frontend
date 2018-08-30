import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {NormalViewComponent} from "./normal-view.component";

const routes: Routes = [
  {path: '', component: NormalViewComponent}
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
