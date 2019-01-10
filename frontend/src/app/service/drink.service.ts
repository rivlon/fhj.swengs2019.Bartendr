import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../api/drink';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient) {
  }

  create(drink: Drink) {
    return this.http.post('/api/drinks/', drink);
  }

  update(drink: Drink) {
    return this.http.put('/api/drinks/', drink);
  }

  delete(drink: Drink) {
    return this.http.delete('/api/drinks/' + drink.id);
  }

  getById(id: string) {
    return this.http.get('/api/drinks/' + id);
  }

  getAll() {
    return this.http.get('/api/drinks/');
  }
}
