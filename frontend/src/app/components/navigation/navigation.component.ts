import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private drinkFormComponent: DrinkFormComponent, private router: Router) {
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
    this.drinkFormComponent.drinkId = null;
    this.router.navigate(['/drink-form']);
  }

  navigateCreateLocation() {
    this.drinkFormComponent.drinkId = null;
    this.router.navigate(['/location-form']);
  }

  navigateCreateUser() {
    this.drinkFormComponent.drinkId = null;
    this.router.navigate(['/user-form']);
  }

}
