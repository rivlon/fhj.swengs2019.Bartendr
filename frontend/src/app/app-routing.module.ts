import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DrinkListComponent} from './drink-list/drink-list.component';
import {DrinkFormComponent} from './drink-form/drink-form.component';
import {LocationFormComponent} from './location-form/location-form.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CreateDrinkFormComponent} from './create-drink-form/create-drink-form.component';
import {CreateLocationFormComponent} from './create-location-form/create-location-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'drink-list', component: DrinkListComponent},
  {path: 'drink-form/:id', component: DrinkFormComponent},
  {path: 'location-form/:id', component: LocationFormComponent},
  {path: 'user-profile/:id', component: UserProfileComponent},
  {path: 'create-drink-form', component: CreateDrinkFormComponent},
  {path: 'create-location-form', component: CreateLocationFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
