import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DrinkListComponent} from './components/drink-list/drink-list.component';
import {DrinkFormComponent} from './components/drink-form/drink-form.component';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LocationsComponent} from './components/locations/locations.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';
import {UserFormComponent} from './components/user-form/user-form.component';
import {DrinksResolver} from './resolver/drinks.resolver';
import {DrinkResolver} from './resolver/drink.resolver';
import {LocationResolver} from './resolver/location.resolver';
import {LocationsResolver} from './resolver/locations.resolver';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'drink-list', component: DrinkListComponent, canActivate: [AuthGuard], resolve: {drinks: DrinksResolver}},
  {
    path: 'drink-form/:id',
    component: DrinkFormComponent,
    canActivate: [AuthGuard],
    resolve: {drink: DrinkResolver, locations: LocationsResolver}
  },
  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuard], resolve: {location: LocationResolver}},
  {path: 'location-form/:id', component: LocationFormComponent, canActivate: [AuthGuard], resolve: {location: LocationsResolver}},
  {path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'drink-form', component: DrinkFormComponent, canActivate: [AdminGuard]},
  {path: 'location-form', component: LocationFormComponent, canActivate: [AdminGuard]},
  {path: 'user-form', component: UserFormComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
