import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import {Drink} from '../../api/drink';
import {HttpClient} from '@angular/common/http';
import {Location} from '../../api/location';

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
              private router: Router, private locationFormComponent: LocationFormComponent, private http: HttpClient) {
    this.loadData();
  }

  ngOnInit() {
    this.fetchData();
  }

  navigateToLocationForm(id: number) {
    this.router.navigate(['/location-form/' + id]);
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }

  deleteLocation(location: Location) {
    this.locationService.delete(location)
      .subscribe(() => {
        this.fetchData();
      });
  }

  fetchData() {
    this.http.get('/api/locations').subscribe((response: any) => {
      this.locations = response._embedded.locations;
    });
  }
}
