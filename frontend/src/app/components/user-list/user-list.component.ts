import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../api/user';
import {UserFormComponent} from '../user-form/user-form.component';
import {Drink} from '../../api/drink';
import {UserService} from '../../service/user.service';

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

  constructor(private authService: AuthService, private userFormComponent: UserFormComponent, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private userService: UserService) {
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
    this.router.navigate(['/user-form/' + username]);
  }

  deleteUser(id: number) {
    this.userService.deleteById(id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}

