import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
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
  rOnly: boolean;
  activatePasswordInsertComponent = true;

  userToBeSafed: User;


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
        Validators.maxLength(35)]),
      'firstname': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]),
      'lastname': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]),
      'email': new FormControl([''], [Validators.required, Validators.minLength(2),
        Validators.maxLength(35)]),
      'admin': new FormControl(),
      'active': new FormControl(),
      /* At least 5 characters in length
        Lowercase letters
        Uppercase letters
        Numbers
        Special characters*/
      'password': new FormControl([''], [Validators.required, Validators.minLength(5),
        Validators.maxLength(10), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{5,}')]),
      'confirm_password': new FormControl([''], [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    }, (formGroup: FormGroup) => {
      return this.ValidatePassword();
    });

    const data = this.route.snapshot.data;
    if (data.user) {
      data.user.confirm_password = '';
      this.userForm.setValue(data.user);
    } else {
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

  updateUser() {
    const userToBeSafed = this.userForm.value;
    this.userService.update(userToBeSafed)
      .subscribe(() => {
        alert('updated successfully');
      });
  }

  /*
    saveUser() {
      let userToBeSafed = this.userForm.value;
      userToBeSafed.email = 'hello';
      if (!this.isAdmin && this.userForm.value.id) {
        const firstname = this.userForm.value.firstname;
        const lastname = this.userForm.value.lastname;
        const eMail = this.userForm.value.email;
        this.userToBeSafed.firstname = firstname;
        this.userToBeSafed.lastname = lastname;
        this.userToBeSafed.email = eMail;
        this.userService.update(this.userToBeSafed)
          .subscribe(() => {
            alert('updated successfully');
          });
      } else if (this.isAdmin) {
        this.userSafe = this.userForm.value;
      }
    }
  */

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


  activatePasswordInsert() {
    this.activatePasswordInsertComponent = false;
  }
}


