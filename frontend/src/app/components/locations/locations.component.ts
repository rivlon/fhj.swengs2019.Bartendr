import { Component, OnInit } from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
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

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    return this.locationService.getAll().subscribe((res: any) => {
      this.locations = res;
    });
  }

}
