import { Component, OnInit } from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: Array<Location>;

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    return this.locationService.getAll().subscribe((res: any) => {
      this.locations = res;
    });
  }

}
