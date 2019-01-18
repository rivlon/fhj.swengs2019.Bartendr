import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DrinkService} from '../service/drink.service';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<Observable<any>> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    return this.userService.getAllUsers();
  }
}
