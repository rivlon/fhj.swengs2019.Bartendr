import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../api/drink';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  drinkId: number;

  constructor(private http: HttpClient) {
  }

  create(drink: Drink) {
    return this.http.post('api/dto/drinks/', drink);
  }

  update(drink: Drink) {
    return this.http.put('api/dto/drinks/' + drink.id, drink);
  }

  delete(drink: Drink) {
    return this.http.delete('api/dto/drinks/' + drink.id);
  }

  getById(id: string) {
    return this.http.get('api/dto/drinks/' + id);
  }

  getAll() {
    return this.http.get('/api/drinks').pipe(
      map((response: any) => {
        return response._embedded.drinks;
      })
    );
  }
}
