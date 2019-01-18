import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {User} from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get('/api/dto/users/');
  }

  getAllActive() {
    return this.http.get('/api/dto/users/active');
  }

  getAllInactive() {
    return this.http.get('/api/dto/users/inactive');
  }

  create(user: User) {
    return this.http.post('/api/dto/users/', user);
  }

  getById(id: number) {
    return this.http.get('/api/dto/users/' + id);
  }

  getByUsername(username: string) {
    return this.http.get('/api/dto/users:' + username);
  }

  update(user: User) {
    return this.http.put('/api/dto/users/' + user.id, user);
  }

  deleteById(userId: number) {
    return this.http.delete('/api/dto/users/' + userId);
  }

  activateUser(user: User) {
    return this.http.put('/api/dto/users/activate/' + user.id, user);
  }

}
