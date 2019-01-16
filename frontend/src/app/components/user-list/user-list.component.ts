import { Component, OnInit } from '@angular/core';
import {Drink} from '../../api/drink';
import {AuthService} from '../../service/auth.service';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../api/user';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  constructor(private authService: AuthService, private userFormComponent: UserFormComponent, private drinkService: DrinkService, private route: ActivatedRoute, private router: Router) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.users = data.users;
  }
  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

  navigateToUserForm(username: string) {
    this.userFormComponent.userName = username;
    this.userFormComponent.rOnly = false;
    this.router.navigate(['/user-form']);
  }
}

