import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DrinkListComponent} from './components/drink-list/drink-list.component';
import {DrinkFormComponent} from './components/drink-form/drink-form.component';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {LocationsComponent} from './components/locations/locations.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';
import {UserFormComponent} from './components/user-form/user-form.component';
import {DrinksResolver} from './resolver/drinks.resolver';
import {DrinkResolver} from './resolver/drink.resolver';
import {LocationResolver} from './resolver/location.resolver';
import {LocationsResolver} from './resolver/locations.resolver';
import {UserResolver} from './resolver/user.resolver';
import {UsersResolver} from './resolver/users.resolver';
import {UserListComponent} from './components/user-list/user-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {path: 'drink-list', component: DrinkListComponent, canActivate: [AuthGuard], resolve: {drinks: DrinksResolver}},
  {path: 'drink-form', component: DrinkFormComponent, canActivate: [AdminGuard],
    resolve: {drink: DrinkResolver, locations: LocationsResolver}},
  {path: 'drink-form/:id', component: DrinkFormComponent, canActivate: [AdminGuard],
    resolve: {drink: DrinkResolver, locations: LocationsResolver}},

  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuard], resolve: {locations: LocationsResolver}},
  {path: 'location-form', component: LocationFormComponent, canActivate: [AdminGuard],
    resolve: {location: LocationResolver, drinks: DrinksResolver}},
  {path: 'location-form/:id', component: LocationFormComponent, canActivate: [AdminGuard],
    resolve: {location: LocationResolver, drinks: DrinksResolver}},

  {path: 'user-list', component: UserListComponent, canActivate: [AdminGuard], resolve: {users: UsersResolver}},
  {path: 'user-form', component: UserFormComponent, canActivate: [AdminGuard], resolve: {user: UserResolver}},
  {path: 'user-form/:username', component: UserFormComponent, canActivate: [AuthGuard],
    resolve: {user: UserResolver}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
