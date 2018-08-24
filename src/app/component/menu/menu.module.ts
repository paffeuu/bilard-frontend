import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {RightMenuComponent} from "./right-menu/right-menu.component";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {ButtonModule, RadioButtonModule, InputSwitchModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule
  ],
  declarations: [
    LeftMenuComponent,
    RightMenuComponent
  ],
  exports: [
    LeftMenuComponent,
    RightMenuComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuModule { }
