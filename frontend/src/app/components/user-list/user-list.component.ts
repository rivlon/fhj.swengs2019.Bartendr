import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../api/user';
import {UserFormComponent} from '../user-form/user-form.component';
import {UserService} from '../../service/user.service';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Array<User>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private authService: AuthService, private userFormComponent: UserFormComponent, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private userService: UserService, private http: HttpClient) {
    this.loadData();
  }

  ngOnInit() {
    this.fetchData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

  fetchData() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.dtTrigger.next();
    });
  }
}

