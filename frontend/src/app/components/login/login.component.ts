import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  today: number = Date.now();
  user: any;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/drink-list']);
    }
    this.user = {
      username: '',
      password: ''
    };
  }
  login() {
    this.authService.login(this.user)
      .subscribe((res: any) => {
      }, (error) => {
        this.toastr.error('Wrong Username or Password!', 'Error:');
      });
  }

}
