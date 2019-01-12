import { Component, OnInit } from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-location-form',
  providers: [LocationFormComponent],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  locationForm;
  shouldNavigateToList: boolean;
  drinkOptions;
  id;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService) { }

  ngOnInit() {
    this.locationForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'plusCode': new FormControl(),
      'rating': new FormControl(),
      'drinks': new FormControl(),
    });

    const data = this.route.snapshot.data;
    this.locationForm.setValue(data.location);
    this.drinkOptions = data.drinks;
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


}
