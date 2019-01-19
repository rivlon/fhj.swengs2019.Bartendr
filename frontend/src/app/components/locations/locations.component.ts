import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../service/location.service';
import {LocationFormComponent} from '../location-form/location-form.component';
import {AuthService} from '../../service/auth.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '../../api/location';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  zoom = 14;
  locations: Array<Location>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  lat = 47.07056250000001;
  lng = 15.438562500000003;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private authService: AuthService, private locationService: LocationService, private route: ActivatedRoute,
              private router: Router, private locationFormComponent: LocationFormComponent, private http: HttpClient,
              private toastr: ToastrService) {
    this.loadData();
  }

  ngOnInit() {
    this.fetchData();
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
      this.rerender();
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
