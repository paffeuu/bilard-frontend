import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { TableModule } from "./component/table/table.module";
import { AppRoutingModule } from "./app-routing.module";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
