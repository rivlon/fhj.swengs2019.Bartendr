import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DrinkService} from '../service/drink.service';
import {DrinkFormComponent} from '../components/drink-form/drink-form.component';

@Injectable({
  providedIn: 'root'
})
export class DrinkResolver implements Resolve<Observable<any>> {

  constructor(private drinkService: DrinkService, private drinkFormComponent: DrinkFormComponent) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.drinkService.getById(id);
    }
    return null;
  }

}
