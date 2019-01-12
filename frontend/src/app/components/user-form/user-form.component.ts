import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../api/user';

@Component({
  selector: 'app-user-form',
  providers: [UserFormComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userId: number;
  userForm;
  shouldNavigateToList: boolean;
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'password': new FormControl(),
      'admin': new FormControl(),
      'firstname': new FormControl(),
      'lastname': new FormControl(),
      'email': new FormControl(),
      'active': new FormControl()
    });

    this.user = this.route.snapshot.data.user;
    if (this.user) {
      this.userForm.setValue(this.user);
    }
  }


  saveUser() {
    const userToBeSafed = this.userForm.value;
    if (userToBeSafed.id) {
      this.userService.update(userToBeSafed)
        .subscribe(() => {
          alert('updated successfully');
          this.navigateToList();
        });
    } else {
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

}
