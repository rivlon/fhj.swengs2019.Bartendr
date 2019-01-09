import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private userService: UserService) {
    this.loadData();
  }

  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  ngOnInit() {
    this.userService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.loadData();
    });
  }

  private loadData() {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.isAdmin = this.userService.isAdmin;
    this.username = this.userService.userName;
  }

  logout() {
    this.userService.logout();
  }

}
