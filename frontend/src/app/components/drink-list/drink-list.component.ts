import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../api/drink';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit {

  drinks: Array<Drink>;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    return this.drinkService.getAll().subscribe((res: any) => {
      this.drinks = res;
    });
  }

}
