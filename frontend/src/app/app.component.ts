import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Bartendr';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkForJWTExpiration();
  }

  checkForJWTExpiration() {
    const token = localStorage.getItem(this.authService.accessTokenLocalStorageKey);
    if (token != null && this.authService.jwtHelperService.isTokenExpired(token)) {
      this.authService.logout();
    }
  }
}
