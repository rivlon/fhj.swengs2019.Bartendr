import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '../../api/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  zoom: number = 17;

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

  deleteLocation(location: Location) {
    this.locationService.delete(location)
      .subscribe(() => {
        this.fetchData();
      });
  }

  fetchData() {
    this.http.get('/api/locations').subscribe((response: any) => {
      this.locations = response._embedded.locations;
      this.fetchCoords(this.locations);
    });
  }

  fetchCoords(inp: Array<Location>) {
    inp.forEach((value) => {
      this.http.get('https://plus.codes/api?ekey=B5Ssb0e4WP0KVL9mDeGRPfCtC6EDoGhQUjmPh2CIFQb2HA5L%2Fo%2B4VFJR8pgd8DLfo9WSAjk%2FFFGQvNJCzFNN43APfTc%3D&address='
        + encodeURIComponent(value.plusCode)).subscribe((response: any) => {
        value.lat = response.plus_code.geometry.location.lat;
        value.lng = response.plus_code.geometry.location.lng;
        value.address = response.plus_code.best_street_address;
      });
    });
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }
}
