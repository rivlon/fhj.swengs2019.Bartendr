import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../api/drink';
import {map} from 'rxjs/operators';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit {

  drinks: Array<Drink>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  constructor(private userService: UserService, private drinkService: DrinkService, private route: ActivatedRoute, private router: Router) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.drinks = data.drinks;
  }
  private loadData() {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.isAdmin = this.userService.isAdmin;
    this.username = this.userService.userName;
  }
}

