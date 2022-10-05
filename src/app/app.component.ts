import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: string;
  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log("event url",e.url);
        console.log("event id",e.id);
      }
      
    }
    );
  }
}


