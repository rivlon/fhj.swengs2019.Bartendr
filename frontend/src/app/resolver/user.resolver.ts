import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {UserFormComponent} from '../components/user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<any>> {

  constructor(private userService: UserService, private userFormComponent: UserFormComponent) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const id = this.userFormComponent.userId;
    if (id) {
      return this.userService.getById(id);
    }
    return null;
  }

}
