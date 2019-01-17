import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';
import {Router} from '@angular/router';
import {LocationFormComponent} from '../location-form/location-form.component';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private userFormComponent: UserFormComponent,
              private drinkFormComponent: DrinkFormComponent, private locationFormComponent: LocationFormComponent,
              private router: Router) {
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

  navigateCreateDrink() {
    this.router.navigate(['/drink-form']);
  }

  navigateCreateLocation() {
    this.router.navigate(['/location-form']);
  }

  navigateCreateUser() {
    this.router.navigate(['/user-form']);
  }

  navigateToProfile() {
    this.router.navigate(['/user-form/' + this.username]);
  }

}
