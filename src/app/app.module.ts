import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { TableModule } from "./component/table/table.module";
import { AppRoutingModule } from "./app-routing.module";
import {ButtonModule} from "primeng/button";
import {RadioButtonModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";

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
    ButtonModule,
    RadioButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
