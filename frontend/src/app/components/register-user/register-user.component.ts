import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  userForm;
  tester: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
              private authService: AuthService) {
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
    this.tester = {
      username: 'creator',
      password: 'creator'
    };

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]/*, [UserNameValidator.createValidator(this.userService)]*/),
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

  saveUser() {
    const userToBeSafed = this.userForm.value;
    this.authService.login(this.tester).subscribe((res: any) => {
      this.userService.create(userToBeSafed)
        .subscribe(() => {
          this.toastr.success('User: ' + userToBeSafed.username + ' has been succesfully created!', 'Successfully Created:');
          this.authService.logout();
          this.router.navigate(['/login']);
        });
    });
  }
}
