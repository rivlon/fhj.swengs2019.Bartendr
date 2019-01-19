import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {LocationService} from '../../service/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Location} from '../../api/location';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-drink-form',
  providers: [DrinkFormComponent],
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.scss']
})
export class DrinkFormComponent implements OnInit {

  drinkForm;
  shouldNavigateToList: boolean;
  locationOptions: Array<Location>;
  loc: Location;
  cat: string;
  text: string;
  categories: Array<string> = ['Beer', 'Wine', 'Vodka', 'Gin'];
  message;
  isAdmin: boolean;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService, private toastr: ToastrService, private authService: AuthService) {

  }

  ngOnInit() {
    this.drinkForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'category': new FormControl(),
      'price': new FormControl(),
      'age': new FormControl(),
      'rating': new FormControl(),
      'locationID': new FormControl(),
      'picture': new FormControl()
    });

    const data = this.route.snapshot.data;
    if (data.drink) {
      this.drinkForm.setValue(data.drink);
      this.locationService.getById(this.drinkForm.value.locationID).subscribe((val: any) => {
        this.loc = val;
      });
      this.cat = this.drinkForm.value.category;
    } else {
      this.locationService.getById('1').subscribe((val: any) => {
        this.loc = val;
      });
    }
    this.locationOptions = data.locations;
    this.isAdmin = this.authService.isAdmin;
  }

  saveDrink() {
    const drinkToBeSafe = this.drinkForm.value;
    if (drinkToBeSafe.id) {
      this.drinkService.update(drinkToBeSafe)
        .subscribe(() => {
          this.message = 'Successfully updated ' + this.drinkForm.value.name + '!';
          this.toastr.success(this.message, 'Message:');
          this.navigateToList();
        });
    } else {
      this.drinkService.create(drinkToBeSafe)
        .subscribe(() => {
          this.message = 'Successfully created ' + this.drinkForm.value.name + '!';
          this.toastr.success(this.message, 'Message:');
          this.navigateToList();
        });
    }
  }

  setCategory(cat: string) {
    this.cat = cat;
    this.drinkForm.patchValue({category: cat});
  }

  setLocation(loc: Location) {
    this.loc.name = loc.name;
    this.drinkForm.patchValue({locationID: loc.id});
  }

  onOpenChange() {
    this.text = this.cat ? this.cat : 'not set';
  }

  navigateToList() {
    if (this.shouldNavigateToList) {
      this.router.navigate(['/drink-list']);
    }
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

}
