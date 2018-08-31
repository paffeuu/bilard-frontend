import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {ButtonModule, RadioButtonModule, InputSwitchModule, SpinnerModule} from "primeng/primeng";
import {AppRoutingModule} from "../../app-routing.module";
import { ProjectorCornersMenuComponent } from './projector-corners-menu/projector-corners-menu.component';
import { ProjectorConfigMenuComponent } from './projector-config-menu/projector-config-menu.component';

@NgModule({
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    AppRoutingModule,
    SpinnerModule
  ],
  declarations: [
    LeftMenuComponent,
    ProjectorCornersMenuComponent,
    ProjectorConfigMenuComponent
  ],
  exports: [
    LeftMenuComponent,
    ProjectorCornersMenuComponent,
    ProjectorConfigMenuComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
