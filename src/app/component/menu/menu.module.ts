import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {ButtonModule, RadioButtonModule, InputSwitchModule, SpinnerModule} from "primeng/primeng";
import {AppRoutingModule} from "../../app-routing.module";
import { ProjectorConfigComponent } from './projector-config/projector-config.component';

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
    ProjectorConfigComponent
  ],
  exports: [
    LeftMenuComponent,
    ProjectorConfigComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
