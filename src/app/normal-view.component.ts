import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-normal-view',
  templateUrl: './normal-view.component.html',
  styleUrls: ['./normal-view.component.css']
})
export class NormalViewComponent implements OnInit, OnDestroy {

  enterPressListener: EventListener;

  constructor(private router: Router) { }

  ngOnInit() {
    this.enterPressListener = (event) => {
      if ((<KeyboardEvent>event).keyCode == 13) {
        this.router.navigate(['projector']);
      }
    };
    window.addEventListener("keypress", this.enterPressListener);
  }

  ngOnDestroy() {
    window.removeEventListener("keypress", this.enterPressListener);
  }

}
