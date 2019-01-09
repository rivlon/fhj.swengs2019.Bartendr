import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DrinkListComponent} from './components/drink-list/drink-list.component';
import {DrinkFormComponent} from './components/drink-form/drink-form.component';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {CreateDrinkFormComponent} from './components/create-drink-form/create-drink-form.component';
import {CreateLocationFormComponent} from './components/create-location-form/create-location-form.component';
import {LocationsComponent} from './components/locations/locations.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'drink-list', component: DrinkListComponent},
  {path: 'drink-form/:id', component: DrinkFormComponent, canActivate: [AuthGuard]},
  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuard]},
  {path: 'location-form/:id', component: LocationFormComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-drink-form', component: CreateDrinkFormComponent, canActivate: [AdminGuard]},
  {path: 'create-location-form', component: CreateLocationFormComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
