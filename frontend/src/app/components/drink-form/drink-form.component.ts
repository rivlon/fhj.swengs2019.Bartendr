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
  id;
  cat: string;
  text: string;

  constructor(private drinkService: DrinkService, private route: ActivatedRoute, private router: Router,
              private locationService: LocationService) {
  }

  ngOnInit() {

    this.drinkForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl([''], [Validators.required, Validators.minLength(2)]),
      'category': new FormControl(),
      'price': new FormControl(),
      'age': new FormControl(),
      'rating': new FormControl(),
      'locations': new FormControl()
    });

    const data = this.route.snapshot.data;

    this.locationService.getAll()
      .subscribe((locations: any) => {
        this.locationOptions = locations._embedded.locations;
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

    const drinkToBeSafe = this.drinkForm.value;
    if (drinkToBeSafe.id) {
      this.drinkService.update(drinkToBeSafe)
        .subscribe(() => {
          alert('updated successfully');
          this.navigateToList();
        });
    } else {
      this.drinkService.create(drinkToBeSafe)
        .subscribe(() => {
          alert('created successfully');
          this.navigateToList();
        });
    }
  }

  deleteDrink(id: number) {
    this.drinkService.delete(id).subscribe(() => {
      alert('Deleted successfuly!');
      this.setShouldNavigateToList();
      this.navigateToList();
    });
  }

  setCategory(cat: string) {
    this.cat = cat;
    this.drinkForm.patchValue({category: cat});
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
