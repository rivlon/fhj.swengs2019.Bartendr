import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Drink} from '../../api/drink';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-location-form',
  providers: [LocationFormComponent],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  locationForm;
  shouldNavigateToList: boolean;
  drinkArray: Array<Drink>;
  drinkOptions: Array<Drink>;
  drinkIDs;
  code;
  adrs = '';
  clicked = false;
  message;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService, private http: HttpClient, private toastr: ToastrService
              , private authService: AuthService) {
    this.loadData();
  }

  ngOnInit() {
    this.locationForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([], [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      'plusCode': new FormControl(),
      'rating': new FormControl(),
      'drinks': new FormControl(),
      'address': new FormControl([], [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    });

    const data = this.route.snapshot.data;
    if (data.location) {
      data.location.address = this.adrs;
      this.locationService.makeRequest(data.location.plusCode).subscribe((response: any) => {
        this.adrs = response.plus_code.best_street_address;
      });
      this.drinkIDs = data.location.drinks;
      this.drinkOptions = data.drinks;
      this.drinkArray = this.drinkOptions.filter(drink => {
        return this.drinkIDs.includes(drink.id);
      });
      this.locationForm.setValue(data.location);
    }
  }

  generatePlusCode(): Promise<string> {
    if (this.locationForm.value.address != null) {
      const address = this.locationForm.value.address;
      this.code = this.locationService.makeRequest(address);
      this.clicked = true;
    } else {
      this.clicked = true;
      return;
    }
  }

  async getPlusCode() {
    await this.generatePlusCode();
    await this.code.subscribe((val: any) => {
      this.locationForm.patchValue(
        {plusCode: (val.plus_code.local_code + ' ' + val.plus_code.locality.local_address)});
      this.saveLocation();
    });
  }

  saveLocation() {
    if (this.isAdmin) {
      const locationToBeSafe = this.locationForm.value;
      if (locationToBeSafe.id) {
        this.locationService.update(locationToBeSafe)
          .subscribe(() => {
            this.message = 'Successfully updated ' + this.locationForm.value.name + '!';
            this.toastr.success(this.message, 'Message:');
            this.navigateToList();
          });
      } else {
        this.locationService.create(locationToBeSafe)
          .subscribe(() => {
            this.message = 'Successfully created ' + this.locationForm.value.name + '!';
            this.toastr.success(this.message, 'Message:');
            this.navigateToList();
          });
      }
    } else {
      this.toastr.error('Not authorized', 'Error:');
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

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

}
