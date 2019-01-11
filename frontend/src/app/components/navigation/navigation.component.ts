import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.loadData();
  }

  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  ngOnInit() {
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.loadData();
    });
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

  logout() {
    this.authService.logout();
  }

}
