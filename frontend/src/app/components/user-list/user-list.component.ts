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

  users: Array<User>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  /*
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  */

  constructor(private authService: AuthService, private userFormComponent: UserFormComponent, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private userService: UserService, private toastr: ToastrService) {
    this.loadData();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.fetchData();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
/*
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  */

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

  deleteUser(id: number) {
    if (this.isAdmin) {
      this.userService.deleteById(id);
      this.fetchData();
    } else {
      this.toastr.error('Only Admins can delete Users!', 'Not authorized!:');
    }
  }

  activateUser(user: User) {
    if (this.isAdmin) {
      this.userService.activateUser(user).subscribe((response: any) => {
        this.fetchData();
      });
    } else {
      this.toastr.error('Only Admins can reactivate Users!', 'Not authorized!:');
    }
  }


  fetchData() {
    this.userService.getAllUsers().subscribe((re: any) => {
      this.users = re;
      this.dtTrigger.next();
    });
  }
}

