import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare global {
  interface Window {
    kommunicate: any;
  }
}

// ok now
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ngOnInit() {}
}
