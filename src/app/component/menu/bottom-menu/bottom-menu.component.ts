import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }
}

