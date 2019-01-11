import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get('api/dto/location/' + id);
  }


  getAll() {
    return this.http.get('/api/locations').pipe(
      map((response: any) => {
        return response._embedded.locations;
      })
    );
  }
}
