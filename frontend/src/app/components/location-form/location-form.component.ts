import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Drink} from '../../api/drink';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-location-form',
  providers: [LocationFormComponent],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  locationForm;
  shouldNavigateToList: boolean;
  drinkArray: Array<Drink>;
  drinkOptions: Array<Drink>;
  drinkIDs;
  code;
  adrs;
  clicked = false;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.locationForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'plusCode': new FormControl(),
      'rating': new FormControl(),
      'drinks': new FormControl(),
      'address': new FormControl()
    });

    const data = this.route.snapshot.data;
    if (data.location) {
      data.location.address = '';
      this.locationForm.setValue(data.location);
    }
    this.drinkOptions = data.drinks;
    this.drinkIDs = data.location.drinks;
    this.drinkArray = this.drinkOptions.filter(drink => {
      return this.drinkIDs.includes(drink.id);
    });
  }

  generatePlusCode() {
    if (this.locationForm.value.plusCode != null) {
      const plusCode = this.locationForm.value.plusCode;
      this.adrs = this.http.get('https://plus.codes/api?ekey=B5Ssb0e4WP0KVL9mDeGRPfCtC6EDoGhQUjmPh2CIFQb2HA5L%2Fo%2B4VFJR8pgd8DLfo9WSAjk%2FFFGQvNJCzFNN43APfTc%3D&address='
        + encodeURIComponent(plusCode)).pipe(map((response: any) => {
        return response.plus_code.best_street_address;
      }));
      this.clicked = true;
    } else if (this.locationForm.value.address != null) {
      const address = this.locationForm.value.address;
      this.code = this.http.get('https://plus.codes/api?ekey=B5Ssb0e4WP0KVL9mDeGRPfCtC6EDoGhQUjmPh2CIFQb2HA5L%2Fo%2B4VFJR8pgd8DLfo9WSAjk%2FFFGQvNJCzFNN43APfTc%3D&address='
        + encodeURIComponent(address)).pipe(map((response: any) => {
        return response.plus_code.local_code + ' ' + response.plus_code.locality.local_address;
      }));
      this.clicked = true;
    } else {
      this.clicked = true;
      return;
    }
  }

  saveLocation() {
    const locationToBeSafe = this.locationForm.value;
    if (locationToBeSafe.id) {
      this.locationService.update(locationToBeSafe)
        .subscribe(() => {
          alert('updated successfully');
          this.navigateToList();
        });
    } else {
      this.locationService.create(locationToBeSafe)
        .subscribe(() => {
          alert('created successfully');
          this.navigateToList();
        });
    }
  }

  navigateToList() {
    if (this.shouldNavigateToList) {
      this.router.navigate(['/locations']);
    }
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

  navigateToDrink(id) {
    this.router.navigate(['/drink-form/' + id]);
  }

}
