import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '../../api/location';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  zoom = 17;

  locations: Array<Location>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  message;
  beforeDelete: number;
  afterDelete: number;


  constructor(private authService: AuthService, private locationService: LocationService, private route: ActivatedRoute,
              private router: Router, private locationFormComponent: LocationFormComponent, private http: HttpClient,
              private toastr: ToastrService) {
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
      });
    this.fetchData();
  }

  writeMessage() {
    this.toastr.success(this.locations.length.toString());
  }

  fetchData() {
    this.http.get('/api/locations').subscribe((response: any) => {
      this.locations = response._embedded.locations;
      this.fetchCoords(this.locations);
    });
  }

  fetchCoords(inp: Array<Location>) {
    inp.forEach((value) => {
      this.locationService.makeRequest(value.plusCode).subscribe((response: any) => {
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
