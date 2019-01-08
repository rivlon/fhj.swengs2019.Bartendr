import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(/*private userService: UserService, private router: Router*/) { }

  ngOnInit() {
    /*this.user = {
      username: '',
      password: ''
    };*/
  }
/*
  login() {
    this.userService.login(this.user)
      .subscribe((res: any) => {
      }, (error) => {
        alert('wrong username or password');
      });
  }
*/
}
