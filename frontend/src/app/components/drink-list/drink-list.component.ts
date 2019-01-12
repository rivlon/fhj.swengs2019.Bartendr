import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../api/drink';
import {AuthService} from '../../service/auth.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';

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

  constructor(private drinkFormComponent: DrinkFormComponent, private authService: AuthService, private drinkService: DrinkService, private route: ActivatedRoute, private router: Router) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.drinks = data.drinks;
  }
  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

  navigateToDrinkForm(id: number) {
    this.drinkFormComponent.drinkId = id;
    this.router.navigate(['/drink-form']);
  }
}

