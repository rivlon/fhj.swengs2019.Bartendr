import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  locations: Array<Location>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;


  constructor(private authService: AuthService, private locationService: LocationService, private route: ActivatedRoute,
              private router: Router, private locationFormComponent: LocationFormComponent) {
    this.loadData();
  }

  ngOnInit() {
    return this.locationService.getAll().subscribe((res: any) => {
      this.locations = res;
    });
  }

  navigateToLocationForm(id: number) {
    this.locationFormComponent.locationId = id;
    this.router.navigate(['/location-form']);
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }
}
