import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocationService} from '../service/location.service';
import {LocationFormComponent} from '../components/location-form/location-form.component';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Observable<Array<any>>> {

  constructor(private locationService: LocationService, private locationFormComponent: LocationFormComponent) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.locationService.getById(id);
    }
    return null;
  }

}
