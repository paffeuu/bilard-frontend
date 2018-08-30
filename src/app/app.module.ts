import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { TableModule } from "./component/table/table.module";
import { AppRoutingModule } from "./app-routing.module";
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";
import {MenuModule} from "./component/menu/menu.module";
import { NormalViewComponent } from './normal-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NormalViewComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
