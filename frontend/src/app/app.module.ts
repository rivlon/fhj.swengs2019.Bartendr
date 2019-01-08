import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { DrinkFormComponent } from './drink-form/drink-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { CreateDrinkFormComponent } from './create-drink-form/create-drink-form.component';
import { CreateLocationFormComponent } from './create-location-form/create-location-form.component';
import { LocationsComponent } from './locations/locations.component';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

export function tokenGetter() {
  return localStorage.getItem('acces_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DrinkListComponent,
    DrinkFormComponent,
    UserProfileComponent,
    LoginComponent,
    LocationFormComponent,
    CreateDrinkFormComponent,
    CreateLocationFormComponent,
    LocationsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
