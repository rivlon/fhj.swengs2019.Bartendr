import { AbstractControl } from '@angular/forms';
import {map} from 'rxjs/operators';
import {UserService} from '../service/user.service';

export class UserNameValidator {
  static createValidator(userService: UserService) {
    return (control: AbstractControl) => {
      return userService.getByUsername(control.value).pipe(map((res: any) => {
        return res === null || res.length === 0 ? null : {userNameTaken: true};
      }));
  };
}}
