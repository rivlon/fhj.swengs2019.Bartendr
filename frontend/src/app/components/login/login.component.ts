import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, private router: Router) { }

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
        alert('wrong username or password');
      });
  }

}
