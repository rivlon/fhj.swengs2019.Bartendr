import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../api/user';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-user-form',
  providers: [UserFormComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userName: string;
  userForm;
  shouldNavigateToList: boolean;
  isAdmin: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'password': new FormControl([''], [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.]),
      'confirmPassword': new FormControl([''], [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      'admin': new FormControl(),
      'firstname': new FormControl(),
      'lastname': new FormControl(),
      'email': new FormControl(),
      'active': new FormControl()
    });

    const data = this.route.snapshot.data;
    if (data.user) {
      this.userForm.setValue(data.user);
    }
    this.isAdmin = this.authService.isAdmin;
  }

  updateUser() {
    const userToBeSafed = this.userForm.value;
    this.userService.update(userToBeSafed)
      .subscribe(() => {
        alert('updated successfully');
      });
  }

  saveUser() {
    const userToBeSafed = this.userForm.value;

    if (userToBeSafed.id) {
      this.userService.update(userToBeSafed)
        .subscribe(() => {
          alert('updated successfully');
          this.navigateToList();
        });
    } else if (this.isAdmin) {
      this.userService.create(userToBeSafed)
        .subscribe(() => {
          alert('created successfully');
          this.navigateToList();
        });

    }

  }
/*
  deleteDrink(id: number) {
    this.userService.delete(id).subscribe(() => {
      alert('Deleted successfuly!');
      this.setShouldNavigateToList();
      this.navigateToList();
    });
  }
  */

  navigateToList() {
    if (this.shouldNavigateToList) {
      this.router.navigate(['/drink-list']);
    }
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

  changePassword() {

  }

}
