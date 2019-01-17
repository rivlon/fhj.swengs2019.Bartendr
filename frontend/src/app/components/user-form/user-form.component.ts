import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {UserNameValidator} from '../../shared/validateUsername';


@Component({
  selector: 'app-user-form',
  providers: [UserFormComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm;
  isAdmin: boolean;
  readOnly: boolean;
  readonlyPassword: boolean;
  shouldNavigateToList: boolean;


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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
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
      'email': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'admin': new FormControl(),
      'active': new FormControl(),
      'password': new FormControl([''], [Validators.required, Validators.minLength(5),
        Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{5,}')]),
      'confirm_password': new FormControl([''], [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
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
    this.isAdmin = this.authService.isAdmin;
  }

  saveUser() {
    const userToBeSafed = this.userForm.value;
    if (userToBeSafed.id) {
      this.userService.update(userToBeSafed)
        .subscribe(() => {
          alert('updated successfully');
          this.readonlyPassword = true;
        });
    } else if (this.isAdmin) {
      this.userService.create(userToBeSafed)
        .subscribe(() => {
          alert('created successfully');
          this.readOnly = true;
          this.readonlyPassword = true;
        });

    }
  }

  activatePasswordInsert() {
    this.readonlyPassword = false;
  }
}


