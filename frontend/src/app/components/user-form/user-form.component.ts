import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {UserNameValidator} from '../../shared/validateUsername';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-user-form',
  providers: [UserFormComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})


export class UserFormComponent implements OnInit {
  userForm;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  readOnly: boolean;
  readonlyPassword: boolean;
  shouldNavigateToList: boolean;
  passWordChanged: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService,
              private toastr: ToastrService) {
    this.loadData();
  }

  ValidatePassword() {
    if (this.userForm == null) {
      return null;
    }
    const password = this.userForm.value.password;
    const confirmPassword = this.userForm.value.confirm_password;

    const result = (password !== null && confirmPassword !== null && password === confirmPassword)
      ? {passwordsMatch: true}
      : {passwordsMatch: false};
    return result;
  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)], [UserNameValidator.createValidator(this.userService)]),
      'firstname': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]),
      'lastname': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]),
      'email': new FormControl([''], [Validators.email, Validators.required, Validators.minLength(6),
        Validators.maxLength(50)]),
      'admin': new FormControl(),
      'active': new FormControl(),
      'password': new FormControl([''], [Validators.required, Validators.minLength(5),
        Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{5,}')]),
      'confirm_password': new FormControl([''], [Validators.required, Validators.minLength(5),
        Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{5,}')]),
    }, (formGroup: FormGroup) => {
      return this.ValidatePassword();
    });

    const data = this.route.snapshot.data;

    if (data.user) {
      this.readOnly = true;
      this.readonlyPassword = true;
      data.user.confirm_password = '';
      this.userForm.setValue(data.user);
    } else {
      this.readOnly = false;
      this.userForm.setValue({
        id: null,
        username: '',
        admin: false,
        firstname: '',
        lastname: '',
        password: '',
        confirm_password: '',
        email: '',
        active: true,
      });
    }
  }

  saveUser() {
    const userToBeSafed = this.userForm.value;
    if (this.username === userToBeSafed.username && !userToBeSafed.active) {
      this.toastr.error('You cannot delete yourself!', 'Error');
    } else if (userToBeSafed.username === 'sysAdmin') {
      this.toastr.error('System Administrator cannot be modified!', 'Error!');
    } else if (userToBeSafed.username === 'creator') {
      this.toastr.error('Creator cannot be modified!', 'Error!');
    } else if (userToBeSafed.id) {
      this.userService.update(userToBeSafed)
        .subscribe(() => {
          if (userToBeSafed.username === this.username && this.isAdmin && !userToBeSafed.isAdmin) {
            this.toastr.info('Your data has been successfully updated but you have to login again.', 'Success!');
            this.authService.logout();
          } else if (this.passWordChanged) {
            this.toastr.info('Password successfully changed. Please login in again!', 'Success!');
            this.authService.logout();
          } else {
            this.toastr.success('User: ' + userToBeSafed.username + ' has been succesfully updated!', 'Successfully Updated:');
            this.readonlyPassword = true;
            this.navigateToList();
          }
        });
    } else if (this.isAdmin) {
      this.userService.create(userToBeSafed)
        .subscribe(() => {
          this.toastr.success('User: ' + userToBeSafed.username + ' has been succesfully created!', 'Successfully Created:');
          this.readOnly = true;
          this.readonlyPassword = true;
          this.setShouldNavigateToList();
          this.navigateToList();
        });
    } else {
      this.toastr.error('Not authorized!', 'Error:');
    }
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

  navigateToList() {
    if (this.shouldNavigateToList) {
      if (this.isAdmin) {
        this.router.navigate(['/user-list']);
      } else {
        this.router.navigate(['/drink-list']);
      }
    }
  }

  activatePasswordInsert() {
    this.readonlyPassword = false;
    this.passWordChanged = true;
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }
}
