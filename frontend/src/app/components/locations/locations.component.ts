import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: Array<Location>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  constructor(private authService: AuthService, private locationService: LocationService, private route: ActivatedRoute, private router: Router, private locationFormComponent: LocationFormComponent) {
    this.loadData();
  }

  ngOnInit() {
    return this.locationService.getAll().subscribe((res: any) => {
      this.locations = res;
    });
  }

  navigateToLocationForm(id: number) {
    this.locationFormComponent.locationId = id;
    this.router.navigate(['/drink-form']);
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

}
