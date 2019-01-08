import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DrinkListComponent} from './drink-list/drink-list.component';
import {DrinkFormComponent} from './drink-form/drink-form.component';
import {LocationFormComponent} from './location-form/location-form.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CreateDrinkFormComponent} from './create-drink-form/create-drink-form.component';
import {CreateLocationFormComponent} from './create-location-form/create-location-form.component';
import {LocationsComponent} from './locations/locations.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'drink-list', component: DrinkListComponent},
  {path: 'drink-form/:id', component: DrinkFormComponent, canActivate: [AuthGuard]},
  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuard]},
  {path: 'location-form/:id', component: LocationFormComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-drink-form', component: CreateDrinkFormComponent, canActivate: [AdminGuard]},
  {path: 'create-location-form', component: CreateLocationFormComponent, canActivate: [AdminGuard]},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
