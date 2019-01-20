import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<any>> {

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private toastr: ToastrService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const userName = route.paramMap.get('username');
    if (!this.authService.isAdmin && userName !== this.authService.userName) {
      this.toastr.error('Not authorized!', 'Error');
      this.router.navigate(['/drink-list/']);
    }
    if (userName) {
      return this.userService.getByUsername(userName);
    } else {
      return null;
    }

  }
}
