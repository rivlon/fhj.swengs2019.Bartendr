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

  createDrink(drink: Drink) {
    return this.http.post('/api/drinks/', drink);
  }

  updateDrink(drink: Drink) {
    return this.http.put('/api/drinks/', drink);
  }

  deleteDrink(drink: Drink) {
    return this.http.delete('/api/drinks/' + drink.id);
  }

  getDrinkById(drink: Drink) {
    return this.http.get('/api/drinks/' + drink.id);
  }

  getAllDrinks() {
    return this.http.get('/api/drinks/');
  }
}
