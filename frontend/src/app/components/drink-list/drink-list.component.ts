import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../api/drink';
import {AuthService} from '../../service/auth.service';
import {DrinkFormComponent} from '../drink-form/drink-form.component';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Location} from '../../api/location';
import {LocationService} from '../../service/location.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  drinks: Array<Drink>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  locations: Array<Location>;
  locationMap: Map<number, string> = new Map<number, string>();

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private drinkFormComponent: DrinkFormComponent, private authService: AuthService, private drinkService: DrinkService,
              private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.loadData();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.locations = data.locations;
    this.locations.forEach(loc => {
      this.locationMap.set(loc.id, loc.name);
    });
    if (data.drinks) {
      this.fetchData();
      this.dtTrigger.next();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  navigateToDrinkForm(id: number) {
    this.router.navigate(['/drink-form/' + id]);
  }

  deleteDrink(drink: Drink) {
    this.drinkService.delete(drink.id)
      .subscribe(() => {
        this.toastr.success('Drink: ' + drink.name + ' has been successfully deleted!', 'Sucess!:');
        this.fetchData();
      });
  }

  fetchData() {
    this.drinkService.getAll().subscribe((response: any) => {
      this.drinks = response;
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

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.username = this.authService.userName;
  }
}
