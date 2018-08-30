import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {ButtonModule, RadioButtonModule, InputSwitchModule} from "primeng/primeng";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    AppRoutingModule
  ],
  declarations: [
    LeftMenuComponent
  ],
  exports: [
    LeftMenuComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
