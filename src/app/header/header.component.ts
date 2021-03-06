import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Authservice } from '../auth/shared/authservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  score: Number;
  constructor(private authService: Authservice, private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.score = this.authService.getScore();
    console.log('ffffffffffff' + this.score);
    console.log(this.username + 'gg');
  }
  logout() {
    this.refreshPage();
    this.authService.logout();
    this.isLoggedIn = false;

    this.router.navigateByUrl('');
  }
  refreshPage() {
    window.location.reload();
  }
}
