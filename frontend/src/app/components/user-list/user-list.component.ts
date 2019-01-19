import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../api/user';
import {UserFormComponent} from '../user-form/user-form.component';
import {UserService} from '../../service/user.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {DataTableDirective} from 'angular-datatables';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  users: Array<User>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private authService: AuthService, private userFormComponent: UserFormComponent, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data.users) {
      this.users = data.users;
      this.dtTrigger.next();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.fetchData();
    }
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

  deleteUser(user: User) {
    if (user.username === 'sysAdmin') {
      this.toastr.error('System Administrator cannot be deleted!', 'Not authorized!:');
    } else if (user.username === this.username) {
      this.toastr.error('You cannot delete yourself!', 'Not authorized!:');
    } else if (this.isAdmin ) {
      this.userService.deleteById(user.id).subscribe(() => {
        this.fetchData();
        this.toastr.success('User with username: ' + user.username + ' has been successfully deleted!', 'Success!:');
      });
    } else {
      this.toastr.error('Only Admins can delete Users!', 'Not authorized!:');
    }
  }

  activateUser(user: User) {
    if (this.isAdmin) {
      this.userService.activateUser(user).subscribe(() => {
        this.fetchData();
        this.toastr.success('User with username: ' + user.username + ' has been successfully reactivated!', 'Success!:');
      });
    } else {
      this.toastr.error('Only Admins can reactivate Users!', 'Not authorized!:');
    }
  }

  fetchData() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.rerender();
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

}

