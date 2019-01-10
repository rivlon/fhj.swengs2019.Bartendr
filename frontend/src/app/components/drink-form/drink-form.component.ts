import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {LocationService} from '../../service/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-drink-form',
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.scss']
})
export class DrinkFormComponent implements OnInit {

  drinkForm;
  shouldNavigateToList: boolean;
  locationOptions;
  locations;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService) {
  }

  ngOnInit() {

    this.drinkForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'category': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'price': new FormControl(),
      'age': new FormControl(),
      'rating': new FormControl(),
      'locations': new FormControl()
    });

    this.locationService.getAll()
      .subscribe((locs: any) => {
          this.locationOptions = locs;
        });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.drinkService.getById(id)
        .subscribe((response) => {
          this.drinkForm.setValue(response);
        });
    }
  }

  saveDrink() {

    const drink = this.drinkForm.value;
    if (drink.id) {
      this.drinkForm.update(drink)
        .subscribe(() => {
          alert('updated successfully');
          this.navigateToList();
        });
    } else {
      this.drinkService.create(drink)
        .subscribe(() => {
          alert('created successfully');
          this.navigateToList();
        });

    }

  }

  navigateToList() {
    if (this.shouldNavigateToList) {
      this.router.navigate(['/drink-list']);
    }
  }

}
